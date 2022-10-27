<template>
  <div class="bv__input">
    <label class="bv__input__label" v-if="label !== ''" :for="name">
      {{ label }}
    </label>

    <div class="bv__input__main">
      <span class="bv__input__icon" v-if="$slots.default">
        <slot></slot>
      </span>

      <input
        class="bv__input__input"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :type="currentType"
        @input="onInput($event.target.value)"
      />

      <span class="bv__input__righticons">
        <span
          v-if="type === 'password'"
          class="bv__input__icon"
          @click="togglePasswordVisibility"
        >
          <icon-eye :shown="currentType !== 'password'" />
        </span>

        <span
          v-if="modelValue.active"
          class="bv__input__icon bv__input__checkmark ml-1"
        >
          <icon-checkmark
            :shown="modelValue.active"
            :isvalid="modelValue.valid"
          />
        </span>
      </span>
    </div>

    <div class="bv__input__errors">
      <small
        v-if="modelValue.active"
        v-for="message in modelValue.errors"
        class="bv__input__error"
      >
        {{ message }} <br />
      </small>
    </div>
  </div>
</template>

<script>
const DEBOUNCE_DELAY = 640
const THROTTLE_DELAY = 640

function debounceInput(cb, delay = DEBOUNCE_DELAY) {
  let timeout
  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function throttleInput(cb, delay = THROTTLE_DELAY) {
  let waiting = false
  let waiting_args

  function timeout() {
    waiting = false

    if (waiting_args === undefined) return

    cb(...waiting_args)

    waiting_args = undefined
  }

  return (...args) => {
    if (waiting) {
      waiting_args = args
      return
    }

    waiting = true
    waiting_args = undefined

    setTimeout(timeout, delay)

    cb(...args)

    return
  }
}

module.exports = {
  props: {
    modelValue: {
      type: Object,
      default(raw) {
        return {
          content: '',
          valid: false,
          active: false,
          required: false,
          errors: [],
          ...raw
        }
      }
    },

    type: {
      type: String,
      default: 'text'
    },

    name: {
      type: String,
      default: undefined
    },

    id: {
      type: String,
      default: 'bv-input'
    },

    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: 'Input'
    },

    autocomplete: {
      type: String,
      default: 'off'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    validators: {
      type: { String: subject => Boolean },
      default: { 'Error Message': subject => true }
    }
  },

  async created() {
    this.modelValue.required = this.required
    this.debouncedInput = debounceInput(this.debouncedInput)
    this.throttledInput = throttleInput(this.throttledInput)

    await this.validate()
    this.$emit('input', this.modelValue)
  },

  data() {
    return {
      currentType: this.type
    }
  },

  methods: {
    async onInput(content) {
      await this.update('content', content)
      await this.debouncedInput(content)
      await this.throttledInput(content)
    },

    async debouncedInput(content) {
      if (content === '') await this.update('active', false)
      else await this.update('active', true)

      await this.validate()
      await this.$emit('debounced-input', content)
    },

    async throttledInput(content) {
      await this.$emit('throttled-input', content)
    },

    async update(key, value) {
      this.modelValue[key] = value
      await this.$emit('input', this.modelValue)
    },

    async validate() {
      let content = this.modelValue.content

      let errors = []

      await Object.entries(this.validators).forEach(async ([error, test]) => {
        let result = await test(content)
        if (!result) errors.push(error)
      })

      if (content === '' && !this.required && errors.length === 0) {
        await this.update('valid', true)
        return
      }

      await this.update('errors', errors)
      await this.update('valid', errors.length === 0)
    },

    togglePasswordVisibility() {
      if (this.currentType === 'password') this.currentType = 'text'
      else this.currentType = 'password'
    }
  },

  components: {
    IconCheckmark: $getCustomComponent('u-Icons-Checkmark'),
    IconEye: $getCustomComponent('u-Icons-Eye')
  }
}
</script>

<style>
.bv__input {
  width: 100%;
}

div.bv__input__main {
  height: 32px;
  border-bottom: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
}

label.bv__input__label {
  padding: 0;
  margin: 0;
  font-size: 12px;
}

input.bv__input__input {
  width: 100%;
  text-indent: 0;
  border: none;
  border-radius: 0;
  outline: none;
  background: none;
}

.bv__input__icon {
  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bv__input__righticons {
  display: flex;
  align-items: center;
  justify-content: center;
}

div.bv__input__errors {
  padding: 6px 0;
  padding-bottom: 12px;
}

small.bv__input__error {
  color: #e15564;
}
</style>

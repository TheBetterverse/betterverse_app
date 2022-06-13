<template>
  <div class="bv-input-wrapper">
    <label class="bv-input-label" v-if="label !== ''" :for="name">
      {{ label }}
    </label>

    <div class="bv-input-main">
      <span class="bv-input-icon" v-if="$slots.default">
        <slot></slot>
      </span>

      <input
        class="bv-input"
        :name="name"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :type="currentType"
        @input="onInput($event.target.value)"
      />

      <span v-if="type === 'password'" @click="togglePasswordVisibility">
        <icon-eye class="bv-input-icon" :shown="currentType !== 'password'" />
      </span>

      <span class="bv-input-icon">
        <icon-checkmark
          :shown="modelValue.active"
          :isvalid="modelValue.valid"
        />
      </span>
    </div>

    <div class="bv-input-errors">
      <small
        v-if="modelValue.active"
        v-for="message in modelValue.errors"
        class="bv-input-error-message"
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
      default: {
        content: '',
        valid: false,
        active: false,
        errors: []
      }
    },
    type: {
      type: String,
      default: 'text'
    },

    name: {
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
      default: 'no'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    validators: {
      type: { String: subject => Boolean },
      default: { 'Error Message': subject => true }
    }
  },

  async created() {
    this.modelValue = {
      content: '',
      valid: false,
      active: false,
      errors: []
    }

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
      let errors = []

      Object.entries(this.validators).forEach(async ([error, test]) => {
        let result = await test(this.modelValue.content)

        if (!result) errors.push(error)
      })

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
div.bv-input-main {
  height: 32px;
  border-bottom: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
}

label.bv-input-label {
  padding: 0;
  margin: 0;
  font-size: 12px;
}

input.bv-input {
  width: 100%;
  text-indent: 5px;
  border: none;
  outline: none;
  background: none;
}

span.bv-input-icon {
  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

div.bv-input-errors {
  padding: 6px 0;
  padding-bottom: 12px;
}

small.bv-input-error-message {
  color: #e15564;
}

::placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder {
  color: #000000;
  opacity: 0.5;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 9999s ease-in-out 9999s;
}
</style>

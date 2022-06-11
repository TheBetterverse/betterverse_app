<!-- Betterverse Input Component -->

<template>
  <div class="bv-input-wrapper w-100">
    <label v-if="label !== ''" :for="name">{{ label }}</label>

    <div class="bv-input">
      <span class="icon"><slot></slot></span>

      <input
        v-model="value"
        :name="name"
        :type="currentType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :disabled="disabled"
        @input="handleInput"
      />

      <span v-if="type === 'password'" @click="togglePasswordVisibility">
        <icon-eye class="icon" :shown="currentType !== 'password'" />
      </span>

      <span>
        <icon-checkmark
          class="icon"
          :shown="active"
          :isvalid="errors.length === 0"
        />
      </span>
    </div>
    <div v-if="active" class="error-div">
      <small v-for="message in errors" class="error-message"
        >{{ message }}<br
      /></small>
    </div>
  </div>
</template>

<script>
const DEBOUNCE_DELAY = 640

function debounceInput(cb, delay = DEBOUNCE_DELAY) {
  let timeout
  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

module.exports = {
  props: {
    value: {
      type: String,
      default: ''
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

    active: {
      type: Boolean,
      default: false
    },

    errors: {
      type: [String],
      default: []
    }
  },

  data() {
    return {
      active: false,
      currentType: this.type
    }
  },

  created() {
    this.debouncedInput = debounceInput(this.debouncedInput)
  },

  methods: {
    /* Events */

    async handleInput(e) {
      await this.$emit('input', this.value)
      await this.debouncedInput(e)
      await this.throttledInput(e)
    },

    async debouncedInput(e) {
      await this.$emit('debounced-input', this.value)
    },

    async throttledInput(e) {
      await this.$emit('throttled-input', this.value)
    },

    /* View controllers */

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
input {
  width: 100%;
  text-indent: 5px;
  border: none;
  outline: none;
  background: none;
}

label {
  font-size: 12px;
}

.bv-input-wrapper {
  padding: 8px 0;
}

.bv-input {
  height: 32px;
  border-bottom: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  height: 20px;
  width: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.error-div {
  padding: 6px 0;
  padding-bottom: 12px;
}

.error-message {
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
  transition: background-color 5000s ease-in-out 5000s;
}
</style>

<template>
  <div>
    <label class="bv-dropdown-label" v-if="label !== ''" :for="name">
      {{ label }}
    </label>

    <div class="bv-dropdown-main">
      <select
        class="bv-dropdown-select"
        :id="name"
        :name="name"
        :disabled="disabled"
        @input="onInput($event.target.value)"
      >
        <option
          v-if="placeholder !== undefined"
          class="bv-dropdown-option"
          disabled
          selected
          hidden
        >
          {{ placeholder }}
        </option>
        <option
          class="bv-dropdown-option"
          v-for="(item, index) in items"
          :key="index"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
    </div>

    <div class="bv-dropdown-errors">
      <small
        v-if="modelValue.active"
        v-for="message in modelValue.errors"
        class="bv-dropdown-error-message"
      >
        {{ message }} <br />
      </small>
    </div>
  </div>
</template>

<script>
const required = {
  'Field is required': subject => subject !== ''
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

    name: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: 'Country'
    },

    items: {
      type: [String],
      default: []
    },

    placeholder: {
      type: String,
      default: undefined
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
    this.modelValue = {
      content: '',
      valid: false,
      active: false,
      errors: []
    }

    if (this.required)
      this.validators = {
        ...required,
        ...this.validators
      }

    await this.validate()
    this.$emit('input', this.modelValue)
  },

  methods: {
    async onInput(content) {
      await this.update('content', content)
      await this.validate()
    },

    async update(key, value) {
      this.modelValue[key] = value
      await this.$emit('input', this.modelValue)
    },

    async validate() {
      let errors = []

      Object.entries(this.validators).forEach(async validator => {
        let [error, test] = validator
        let result = await test(this.modelValue.content)

        if (!result) errors.push(error)
      })

      await this.update('errors', errors)
      await this.update('valid', errors.length === 0)
    }
  }
}
</script>

<style>
div.bv-dropdown-main {
  height: 32px;
  border-bottom: 1px solid black;

  display: flex;
  align-items: center;
  justify-content: center;
}

label.bv-dropdown-label {
  padding: 0;
  margin: 0;
  font-size: 12px;
}

select.bv-dropdown-select {
  width: 100%;
  border: none;
  outline: none;
  background: #eceae3;
}

div.bv-dropdown-errors {
  padding: 6px 0;
  padding-bottom: 12px;
}

small.bv-dropdown-error-message {
  color: #e15564;
}

::placeholder,
::-webkit-input-placeholder,
:-ms-input-placeholder {
  color: #000000;
  opacity: 0.5;
}

select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 9999s ease-in-out 9999s;
}
</style>

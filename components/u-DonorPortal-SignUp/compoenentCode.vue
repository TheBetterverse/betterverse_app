<!-- Donor Portal Sign Up Form -->

<template>
  <div class="w-100">

    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row id="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5">
        <b-col class="d-flex align-items-center">
          <icon-betterverse id="md-logo"/>
        </b-col>

        <b-col class="text-right">
          <small>Have an account?<br><a href="#">Log in</a></small>
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Create Account</div>
    <div class="my-3 mb-4">
      <slot>
        <h1>Welcome to the <b>Betterverse</b></h1>
        <h2>Here will say something about this and how it must be extraordinay.</h2>
      </slot>
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit">

      <!-- E-mail Input -->
      <div class="field-wrapper">

        <label for="email-input">Continue with email</label>

        <div class="input-wrapper">
          <span>
            <icon-mail class="prefix-icon" />
          </span>

          <input
            v-model="email"
            :disabled="$getGlobalModel('signUpProcess')"
            @input="onInput"

            type="text"
            id="email-input"
            name="email-input"
            autocomplete="on"
            placeholder="Type e-mail address"
          />

          <span>
            <icon-checkmark shown isvalid />
          </span>
        </div>

        <div class="error-div">
          <small v-for="err in emailErrors" class="error-message"
            >{{ err }}<br
          /></small>
        </div>

      </div>

      <!-- Password Input -->
      <div class="field-wrapper">

        <label for="password-input">Password</label>

        <div class="input-wrapper">
          <span>
            <icon-lock class="prefix-icon" />
          </span>

          <input
            id="password-input"
            name="password"
            autocomplete="new-password"
            placeholder="Type password"

            v-model="password"
            :type="inputType"
            :disabled="$getGlobalModel('signUpProcess')"
            @input="onInput"
          />

          <span>
            <icon-checkmark shown/>
          </span>

          <span @click="togglePasswordVisibility">
            <icon-eye
              :shown="inputType === 'text'"
              class="suffix-icon"
            />
          </span>
        </div>

        <div class="error-div">
          <small v-for="err in passwordErrors" class="error-message"
            >{{ err }}<br
          /></small>
        </div>

      </div>

      <!-- Continue button -->
      <div class="button-wrapper d-flex justify-content-end">

        <b-spinner v-if="$getGlobalModel('signUpProcess')" small></b-spinner>

        <button
          v-else

          id="continue-email-button"
          :disabled="$getGlobalModel('signUpProcess')"
        >
          Continue with email
          <span id="continue-email-arrow"><icon-leftarrow /></span>
        </button>

      </div>

    </form>
  </div>
</template>

<script>
const DEFAULT_TIMEOUT = 6500 // in miliseconds

function debounceInput(cb, delay = 640) {
  let timeout
  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

module.exports = {
  data() {
    return {
      password: '',
      email: '',
      confirmPass: '',
      inputType: 'password',
      emailErrors: [],
      passwordErrors: [],
      confirmPassErrors: []
    }
  },

  mounted() {
    this.onInput = debounceInput(this.onInput)
  },

  methods: {
    // events

    onSubmit(e) {
      console.log(e)
      $setGlobalModel('signUpProcess', true)
    },

    onInput(e) {
      console.log(e)
    },

    // functionality

    togglePasswordVisibility() {
      if (this.inputType === 'password') this.inputType = 'text'
      else this.inputType = 'password'
    },

    displayError(errMsgArray, message) {
      if (errMsgArray.includes(message)) return
      errMsgArray.push(message)
      setTimeout(() => {
        let index = errMsgArray.indexOf(message)
        errMsgArray.splice(index, 1)
      }, DEFAULT_TIMEOUT)
    },

    clearErrors(errMsgArray) {
      errMsgArray.splice(0, errMsgArray.length)
    }

  },

  components: {
    IconCheckmark: $getCustomComponent('u-Icons-Checkmark'),
    IconEye: $getCustomComponent('u-Icons-Eye'),
    IconLeftarrow: $getCustomComponent('u-Icons-Leftarrow'),
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse')
  }
}
</script>

<style>
body {
  font-size: 14px;
  font-weight: 500;
}

.container, .row, .col {
  padding: 0;
  margin: 0;
}

#status-bar-clearance {
  height: 44px;
}

#md-logo {
  heigth: 32px;
  width: 32px;
}

.field-wrapper,
.button-wrapper {
  padding: 8px 0;
}

.input-wrapper {
  height: 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
}

.prefix-icon {
  height: 20px;
  width: 20px;
}

label {
  font-size: 12px;
}

input {
  width: 100%;
  text-indent: 5px;
  border: none;
  outline: none;
  background: none;
}

.suffix-icon {
  height: 20px;
  width: 20px;
}

.error-message {
  color: #e15564;
}

.error-div {
  padding: 0.5em 0;
}

#continue-email-button {
  color: white;
  background: black;
  height: 32px;
  padding: 6px 8px 6px 12px;
  gap: 4px;
  border: 1px solid #000000;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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

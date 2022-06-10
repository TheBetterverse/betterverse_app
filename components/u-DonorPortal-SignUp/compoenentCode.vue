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
    <div class="my-2">
      Create Account
    </div>
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
            @input="onEmailInput"

            type="text"
            id="email-input"
            name="email-input"
            autocomplete="on"
            placeholder="Type e-mail address"
          />

          <span>
            <icon-checkmark
              :shown="isInputtingEmail"
              :isvalid="emailIsValid"
            />
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
            name="password-input"
            autocomplete="new-password"
            placeholder="Type password"

            v-model="password"
            :type="inputType"
            :disabled="$getGlobalModel('signUpProcess')"
            @input="onPasswordInput"
          />

          <span @click="togglePasswordVisibility">
            <icon-eye
              :shown="inputType === 'text'"
              class="suffix-icon"
            />
          </span>

          <span>
            <icon-checkmark
              :shown="isInputtingPassword"
              :isvalid="passwordIsValid"
              :disabled="$getGlobalModel('signUpProcess')"
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
          name="continue-email-button"

          :disabled="$getGlobalModel('signUpProcess')"
        >
          Continue with email
          <span id="continue-email-arrow"><icon-leftarrow /></span>
        </button>

      </div>

      <hr />

      <div class="my-2">Or continue with</div>
      <div class="socials d-inline-flex w-100">
        <button-signup
          name="sign-up-google"
          icon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
        >
          Google
        </button-signup>

        <button-signup
          name="sign-up-facebook"
          icon="https://cdn-icons-png.flaticon.com/512/145/145802.png"
        >
          Facebook
        </button-signup>

        <button-signup
          name="sign-up-discord"
          icon="https://camo.githubusercontent.com/323fb0ba057ee8c0b4fdd6e89e35967cb30cfcfd/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f7468652d6d696e6572732d686176656e2d70726f6a6563742f696d616765732f642f64642f446973636f72642e706e672f7265766973696f6e2f6c61746573743f63623d3230313730333038303333353436"
        >
          Discord
        </button-signup>
      </div>

      <div class="mt-6 d-none d-lg-block">           
        <small>Already have an account? <a href="#">Log in</a></small>
      </div>

    </form>
  </div>
</template>

<script>
/* this should move out to another file ********** */
function debounceInput(cb, delay = 640) {
  let timeout
  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
/* ********************************************  */


/* this should move out to another file ********** */

// that ol regex black magic
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

async function emailIsRightFormat(subject) {
  return emailRegex.test(subject)
}

async function emailDontExist(subject) {
  /* needs implementation */
  return true
}

async function validateInput(subject, validators) {
  let errors = []

  await validators.forEach(async v => {
    let result = await v.validator(subject)

    if (!result) errors.push(v.errorMessage)
  })

  return {
    errors,
    passed: errors.length === 0
  }
}

function hasMinLength(length) {
  return async function (subject) {
    return subject.length >= length
  }
}
/* ********************************************  */

const emailValidators = [
  {validator: emailDontExist,     errorMessage: "Email is already registered"},
  {validator: emailIsRightFormat, errorMessage: "Email format is invalid"}
]

const passwordValidators = [
  {validator: hasMinLength(8), errorMessage: "Password should have at least 8 digits"}
]

module.exports = {
  data() {
    return {
      password: '',
      email: '',
      inputType: 'password',
      emailIsValid: false,
      passwordIsValid: false,
      isInputtingEmail: false,
      isInputtingPassword: false,
      emailErrors: [],
      passwordErrors: []
    }
  },

  mounted() {
    this.onEmailInput = debounceInput(this.onEmailInput)
    this.onPasswordInput = debounceInput(this.onPasswordInput)
  },

  methods: {
    /* Events */

    async onSubmit(e) {
      switch(e.submitter.name) {
        case "continue-email-button": {
          await this.signUpEmail(e)
          break
        }
        
        case "sign-up-google": {
          await this.signUpEmail(e)
          break
        }

        case "sign-up-facebook": {
          await this.signUpFacebook(e)
          break
        }

        case "sign-up-discord": {
          await this.signUpDiscord(e)
          break
        }
      }
    },

    async onEmailInput() {
      if (this.email === '') {
        this.isInputtingEmail = false
        this.clearErrors(this.emailErrors)
        return
      }

      this.isInputtingEmail = true
      let {passed, errors} = await validateInput(this.email, emailValidators)

      this.clearErrors(this.emailErrors)

      if (!passed) {
        this.emailIsValid = false
        this.displayErrors(this.emailErrors, errors)
        return
      }

      this.emailIsValid = true
    },

    async onPasswordInput() {
      if (this.password === '') {
        this.isInputtingPassword = false
        this.clearErrors(this.passwordErrors)
        return
      }

      this.isInputtingPassword = true
      let {passed, errors} = await validateInput(this.password, passwordValidators)

      if (!passed) {
        this.passwordIsValid = false
        this.displayErrors(this.passwordErrors, errors)
        return
      }

      this.passwordIsValid = true
      this.clearErrors(this.passwordErrors)
    },


    /* Submit methods */

    async signUpEmail(e) {
      let emailValidation = await validateInput(this.email, emailValidators)
      let isEmailValid = emailValidation.passed
      let emailErrors = emailValidation.errors

      let passwordValidation = await validateInput(this.password, passwordValidators)
      let isPasswordValid = passwordValidation.passed
      let passwordErrors = passwordValidation.errors

      let inputsAreValid = isEmailValid && isPasswordValid

      if (!isEmailValid) {
        this.emailIsValid = false
        this.isInputtingEmail = true
        this.displayErrors(this.emailErrors, emailErrors)
      }

      if (!isPasswordValid) {
        this.passwordIsValid = false
        this.isInputtingPassword = true
        this.displayErrors(this.passwordErrors, passwordErrors)
      }

      if (!inputsAreValid) return

      // $setGlobalModel('signUpProcess', true)

      // $anonUserToPermanent('emailAndPassword', {
      //   email: this.email,
      //   password: this.password,
      // })
      //   .then(() => {
      //       $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
      //       $setGlobalModel('signUpProcess', false)
      //   })
      //   .catch(err => {
      //       $setGlobalModel('signUpProcess', false)
      //       console.error(err)
      //   })
    },

    async signUpGoogle(e) {
      $setGlobalModel('signUpProcess', true)

      $anonUserToPermanent('google')
        .then(() => {
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
          $setGlobalModel('signUpProcess', false)
        })
        .catch(err => {
          $setGlobalModel('signUpProcess', false)
          console.error(err)
        })
    },

    async signUpFacebook(e) {
      throw "Sign up with facebook is not implemented"
    },

    async signUpDiscord(e) {
      throw "Sign up with discord is not implemented"
    },


    /* View controllers */

    togglePasswordVisibility() {
      if (this.inputType === 'password') this.inputType = 'text'
      else this.inputType = 'password'
    },

    displayError(targetArray, message) {
      if (targetArray.includes(message)) return

      targetArray.push(message)
    },

    displayErrors(targetArray, errorMessageArray) {
      errorMessageArray.forEach(err => this.displayError(targetArray, err))
    },

    hideError(targetArray, message) {
      let index = targetArray.indexOf(message)
    
      if (index === -1) return

      targetArray.splice(index, 1)
    },

    clearErrors(targetArray) {
      targetArray.splice(0, targetArray.length)
    }

  },

  components: {
    IconCheckmark: $getCustomComponent('u-Icons-Checkmark'),
    IconEye: $getCustomComponent('u-Icons-Eye'),
    IconLeftarrow: $getCustomComponent('u-Icons-Leftarrow'),
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    ButtonSignup: $getCustomComponent('u-Button-SignUp')
  }
}
</script>

<style>
  body {
    font-size: 14px;
    font-weight: 500;
  }

  .socials > button {
    margin-right: 10px;
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

<!-- Donor Portal Registration Form -->

<template>
  <div class="w-100">
    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5 d-flex">
        <b-col class="d-flex align-items-center">
          <icon-betterverse width="32" heigth="32" />
        </b-col>

        <b-col class="text-right d-flex justify-content-end">
          <small
            >Don't have an account?<br /><a href="#">Create account</a></small
          >
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Reset password</div>
    <div class="my-3">
      <slot>
        <h1>Forgot your <b>password?</b></h1>
        <h2>
          Here will say something about this and how it must be extraordinay.
        </h2>
      </slot>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="my-3">
        <!-- Email Input -->
        <bv-input
          label="Continue with email"
          name="email-input"
          type="text"
          placeholder="Type e-mail address"
          v-model="form.email"
          :validators="validators.email"
          :disabled="$getGlobalModel('signUpProcess')"
        >
          <icon-mail />
        </bv-input>
      </div>

      <!-- Continue button -->
      <div class="d-flex justify-content-end">
        <button-continue
          name="continue-email-button"
          :disabled="$getGlobalModel('signUpProcess')"
          >Continue</button-continue
        >
      </div>

      <!-- Footer for large displays -->
      <div class="mt-9 d-none d-lg-block">
        <small>Don't have an account? <a href="#">Create account</a></small>
      </div>
    </form>
  </div>
</template>

<script>
async function emailIsRightFormat(subject) {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    subject
  )
}

async function emailDontExist(subject) {
  /* needs implementation */
  return true
}

function hasMinLength(length) {
  return async function (subject) {
    return subject.length >= length
  }
}

function notEmptyString(subject) {
  return subject !== ''
}

// ---

module.exports = {
  data() {
    return {
      form: {
        email: {},
        password: {}
      },
      validators: {
        email: {
          "Field can't be empty": notEmptyString,
          'Email is already registered': emailDontExist,
          'Email format is invalid': emailIsRightFormat
        },
        password: {
          "Field can't be empty": notEmptyString,
          'Password should have at least 8 digits': hasMinLength(8)
        }
      }
    }
  },

  methods: {
    /* Events */
    async handleSubmit(e) {
      let target = e.submitter.name

      switch (target) {
        case 'continue-email-button':
          await this.signUpEmail(e)
          break
        case 'sign-up-google':
          await this.signUpGoogle(e)
          break
        case 'sign-up-facebook':
          await this.signUpFacebook(e)
          break
        case 'sign-up-discord':
          await this.signUpDiscord(e)
          break
      }
    },

    /* Sign Up Methods */

    async signUpEmail(e) {
      this.showErrors()

      if (!this.inputsAreValid) {
        console.log('> INPUTS ARE INVALID')
        return
      }

      console.log('> INPUTS ARE VALID')
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
      throw 'Sign up with facebook is not implemented'
    },

    async signUpDiscord(e) {
      throw 'Sign up with discord is not implemented'
    },

    /* View controller */

    async showErrors() {
      Object.values(this.form).forEach(field => (field.active = true))
    }
  },

  computed: {
    inputsAreValid() {
      return Object.values(this.form).every(field => field.valid)
    },

    formContent() {
      return Object.entries(this.form).reduce((prev, curr) => {
        prev[curr[0]] = curr[1].content
        return prev
      }, {})
    }
  },

  components: {
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconGoogle: $getCustomComponent('u-Icons-Google'),
    IconFacebook: $getCustomComponent('u-Icons-Facebook'),
    IconDiscord: $getCustomComponent('u-Icons-Discord'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    ButtonSignup: $getCustomComponent('u-Buttons-Pill'),
    ButtonContinue: $getCustomComponent('u-Buttons-LeftArrow'),
    BvInput: $getCustomComponent('u-Components-Input')
  }
}
</script>

<style>
.container,
.row,
.col {
  padding: 0;
  margin: 0;
}

div.status-bar-clearance {
  height: 44px;
}
</style>

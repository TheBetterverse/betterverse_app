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
          <small>Have an account?<br /><a href="#">Log in</a></small>
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Create Account</div>
    <div class="my-3">
      <slot>
        <h1>Welcome to the <b>Betterverse</b></h1>
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

        <!-- Password Input -->
        <bv-input
          label="Password"
          name="password-input"
          type="password"
          placeholder="Type password"
          v-model="form.password"
          :validators="validators.password"
          :disabled="$getGlobalModel('signUpProcess')"
        >
          <icon-lock />
        </bv-input>
      </div>

      <!-- Continue button -->
      <div class="d-flex justify-content-end">
        <button-continue
          name="continue-email-button"
          :disabled="$getGlobalModel('signUpProcess')"
          >Continue with email</button-continue
        >
      </div>

      <hr />

      <!-- Socials -->
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

      <!-- Footer for large displays -->
      <div class="mt-6 d-none d-lg-block">
        <small>Already have an account? <a href="#">Log in</a></small>
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

div.socials > button {
  margin-right: 10px;
}

div.status-bar-clearance {
  height: 44px;
}
</style>

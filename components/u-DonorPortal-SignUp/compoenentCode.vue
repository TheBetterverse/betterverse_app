<!-- Donor Portal Sign Up Form -->

<template>
  <div class="w-100">
    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row id="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5">
        <b-col class="d-flex align-items-center">
          <icon-betterverse id="md-logo" />
        </b-col>

        <b-col class="text-right">
          <small>Have an account?<br /><a href="#">Log in</a></small>
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Create Account</div>
    <div class="my-3 mb-4">
      <slot>
        <h1>Welcome to the <b>Betterverse</b></h1>
        <h2>
          Here will say something about this and how it must be extraordinay.
        </h2>
      </slot>
    </div>

    <form @submit.prevent="handleSubmit">
      <!-- Email Input -->
      <bv-input
        label="Continue with email"
        name="email-input"
        type="text"
        placeholder="Type e-mail address"
        v-model="email"
        :disabled="$getGlobalModel('signUpProcess')"
        :active="showEmailErrors"
        :errors="emailErrors"
        @debounced-input="handleInput"
      >
        <icon-mail />
      </bv-input>

      <!-- Password Input -->
      <bv-input
        label="Password"
        name="password-input"
        type="password"
        placeholder="Type password"
        v-model="password"
        :disabled="$getGlobalModel('signUpProcess')"
        :errors="passwordErrors"
        :active="showPasswordErrors"
        @debounced-input="handleInput"
      >
        <icon-lock />
      </bv-input>

      <!-- Continue button -->
      <div class="button-wrapper d-flex justify-content-end">
        <b-spinner v-if="$getGlobalModel('signUpProcess')" small></b-spinner>

        <button
          v-else
          id="continue-email-button"
          name="continue-email-button"
          :disabled="$getGlobalModel('signUpProcess')"
        >
          <span> Continue with email </span>
          <span id="continue-email-arrow">
            <icon-leftarrow />
          </span>
        </button>
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
async function validate(subject, validators) {
  let errors = []

  await validators.forEach(async validator => {
    console.log(validator)
    let [error, test] = Object.entries(validator)[0]
    let result = await test(subject)

    if (!result) errors.push(error)
  })

  return errors
}

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

const emailValidators = [
  { "Field can't be empty": notEmptyString },
  { 'Email is already registered': emailDontExist },
  { 'Email format is invalid': emailIsRightFormat }
]

const passwordValidators = [
  { "Field can't be empty": notEmptyString },
  { 'Password should have at least 8 digits': hasMinLength(8) }
]

// ---

module.exports = {
  created() {},

  data() {
    return {
      email: '',
      password: '',
      showEmailErrors: false,
      showPasswordErrors: false,
      emailErrors: [],
      passwordErrors: []
    }
  },

  methods: {
    /* Events */

    async handleInput(e) {
      await this.validateForm()

      if (this.email === '') this.showEmailErrors = false
      else this.showEmailErrors = true

      if (this.password === '') this.showPasswordErrors = false
      else this.showPasswordErrors = true
    },

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
      await this.validateForm()

      if (!this.inputsAreValid) {
        this.showEmailErrors = true
        this.showPasswordErrors = true
        return
      }
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

    async validateForm() {
      this.emailErrors = await validate(this.email, emailValidators)
      this.passwordErrors = await validate(this.password, passwordValidators)
    }
  },

  computed: {
    inputsAreValid() {
      return this.emailErrors.length === 0 && this.passwordErrors.length === 0
    }
  },

  components: {
    BvInput: $getCustomComponent('u-Components-Input'),
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconLeftarrow: $getCustomComponent('u-Icons-Leftarrow'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    ButtonSignup: $getCustomComponent('u-Button-SignUp')
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

.socials > button {
  margin-right: 10px;
}

#status-bar-clearance {
  height: 44px;
}

#md-logo {
  height: 32px;
  width: 32px;
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
</style>

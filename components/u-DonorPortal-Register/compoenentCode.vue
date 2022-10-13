<!-- Donor Portal Registration Form -->

<template>
  <main class="w-100">
    <!-- For small displays -->
    <header class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5 d-flex align-items-center">
        <b-col class="d-flex align-items-center">
          <icon-betterverse width="32" heigth="32" />
        </b-col>

        <b-col class="text-right d-flex justify-content-end">
          <small
            >Have an account?<br /><a
              href="#"
              @click="DonorPortal_RedirectToSignIn"
              >Log in</a
            ></small
          >
        </b-col>
      </b-row>
    </header>

    <section name="title" class="mb-5">
      <b-container>
        <b-row class="my-3">
          <p>Create account</p>
        </b-row>
        <b-row>
          <slot>
            <h1>Welcome to <b>Betterverse</b></h1>
            <p>
              Join the world’s first charitable metaverse. Together we can
              change the way we donate for the better.
            </p>
          </slot>
        </b-row>
      </b-container>
    </section>

    <form @submit.prevent="handleSubmit">
      <section name="form-inputs">
        <div class="my-3">
          <bv-input
            label="Continue with email"
            name="email-input"
            type="text"
            placeholder="Type e-mail address"
            v-model="form.email"
            :validators="validators.email"
          >
            <icon-mail />
          </bv-input>

          <bv-input
            label="Password"
            name="password-input"
            type="password"
            placeholder="Type password"
            v-model="form.password"
            :validators="validators.password"
          >
            <icon-lock />
          </bv-input>
        </div>

        <div class="d-flex justify-content-end">
          <bv-button secondary type="submit" name="continue-email-button">
            <template #default>
              <p v-if="form.email.content">Continue with email</p>
            </template>
            <template #right-icon>
              <icon-rightarrow
                v-if="spinnerActive == false"
                color="white"
              ></icon-rightarrow>
              <div
                v-if="spinnerActive == true"
                class="spinner-border spinner-border-sm"
                role="status"
              ></div>
            </template>
          </bv-button>
        </div>
      </section>

      <hr />

      <section name="socials">
        <div class="my-2">Or continue with</div>
        <div id="bv__register__socialsbuttons" class="w-100">
          <bv-button responsive name="sign-up-google">
            <template>
              <div class="bv__register__socialbutton">
                <icon-google></icon-google>
                <p class="d-none d-xl-block">Google</p>
              </div>
            </template>
          </bv-button>

          <bv-button responsive name="sign-up-facebook">
            <div class="bv__register__socialbutton">
              <icon-facebook></icon-facebook>
              <p class="d-none d-xl-block">Facebook</p>
            </div>
          </bv-button>

          <bv-button responsive name="sign-up-discord">
            <div class="bv__register__socialbutton">
              <icon-discord></icon-discord>
              <p class="d-none d-xl-block">UD</p>
            </div>
          </bv-button>
        </div>
      </section>

      <!-- For large displays -->
      <footer class="mt-6 d-none d-lg-block"></footer>
    </form>
  </main>
</template>

<script>
async function emailIsRightFormat(subject) {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    subject
  )
}

async function emailDontExist(subject) {
  var users = await $getGrid('users').map(record => record.$user$display || '')

  for (i = 1; i < users.length; i++) {
    if (users[i] == subject) {
      return false
    }
  }

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

function passwordIsValid(subject) {
  const validation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  return validation.test(subject)
}

// ---

module.exports = {
  props: ['DonorPortal_RedirectToSignIn'],
  data() {
    return {
      spinnerActive: false,
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
          'Password must contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character':
            passwordIsValid
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
        return
      }

      this.spinnerActive = true

      await new Promise(r => setTimeout(r, 2000))

      $anonUserToPermanent('emailAndPassword', {
        email: this.formContent.email,
        password: this.formContent.password
      })
        .then(() => {
          //Redirect to personal info setup
          $setUser('ProfileSetUpStage', 1)
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {
          this.spinnerActive = false
          alert(err.message)
        })
    },

    async signUpGoogle(e) {
      await $anonUserToPermanent('google', {})
        .then(() => {
          $setUser('ProfileSetUpStage', 1)
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {})
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
    IconDiscord: $getCustomComponent('u-Icons-UnstoppableDomains'),
    IconRightarrow: $getCustomComponent('u-Icons-ArrowRight'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    BvButton: $getCustomComponent('u-Components-Button'),
    BvInput: $getCustomComponent('u-Components-Input')
  }
}
</script>

<style>
.col,
.row,
.container {
  margin: 0;
  padding: 0;
}

div.status-bar-clearance {
  height: 44px;
}

#bv__register__socialsbuttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: auto;
  width: auto;
  gap: 10px;
}

#bv__register__socialsbuttons > button {
  height: 32px;
  width: 32px;
}

.bv__register__socialbutton {
  display: flex;
  gap: 8px;
}

@media screen and (min-width: 992px) {
  #bv__register__socialsbuttons {
    justify-content: space-between;
  }

  #bv__register__socialsbuttons > button {
    width: 100%;
    height: 32px;
  }
}
</style>

<template>
  <main class="w-100">
    <!-- For small displays -->

    <section name="title" class="mb-4">
      <b-container>
        <b-row class="mb-3">
          <p>Log in</p>
        </b-row>
        <b-row class="d-flex flex-column">
          <slot>
            <h1>Welcome back to <b>Betterverse</b></h1>
            <p>We missed you while you were away.</p>
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
            v-model="form.email"
            placeholder="Type e-mail address"
            :validators="validators.email"
            :disabled="$getGlobalModel('signUpProcess')"
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
            :disabled="$getGlobalModel('signUpProcess')"
          >
            <icon-lock />
          </bv-input>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p style="line-height: 16px">
              <small> Forgot passowrd? </small>
            </p>

            <p style="line-height: 16px">
              <small>
                <b
                  ><u
                    ><a href="#" @click="DonorPortal_RedirectToResetPassword"
                      >Let's reset it!</a
                    ></u
                  ></b
                >
              </small>
            </p>
          </div>
          <bv-button
            secondary
            name="continue-email-button"
            title="Continue with email"
            :disabled="$getGlobalModel('signUpProcess')"
          >
            <template #default>
              <p v-if="form.email.content">Continue with email</p>
            </template>
            <template #right-icon>
              <icon-arrow
                right
                v-if="spinnerActive == false"
                color="white"
              ></icon-arrow>
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
          <bv-button
            responsive
            name="sign-up-google"
            title="Sign up with Google"
          >
            <template>
              <div class="bv__register__socialbutton">
                <icon-google></icon-google>
                <p class="d-none d-xl-block">Google</p>
              </div>
            </template>
          </bv-button>

          <bv-button
            responsive
            name="sign-up-facebook"
            title="Sign up with Facebook"
          >
            <div class="bv__register__socialbutton">
              <icon-facebook></icon-facebook>
              <p class="d-none d-xl-block">Facebook</p>
            </div>
          </bv-button>

          <bv-button
            responsive
            name="sign-up-unstoppable"
            title="Sign up with Unstoppable"
          >
            <div class="bv__register__socialbutton">
              <icon-discord></icon-discord>
              <p class="d-none d-xl-block">Unstoppable</p>
            </div>
          </bv-button>
        </div>
      </section>
    </form>
  </main>
</template>

<script>
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

async function emailIsRightFormat(subject) {
  return emailRegex.test(subject)
}

async function emailNotRegistered(subject) {
  const users = await $getGrid('users')

  for (i = 0; i < users.length; i++) {
    if (users[i].$user$display == subject) {
      return true
    }
  }
  return false
}

function notEmptyString(subject) {
  return subject !== ''
}

module.exports = {
  props: [
    'DonorPortal_RedirectToSignUp',
    'DonorPortal_RedirectToResetPassword'
  ],
  data() {
    return {
      spinnerActive: false,
      googleSignIn: false,
      facebookSignIn: false,
      unstoppableSignIn: false,
      validCombo: false,
      form: {
        email: {},
        password: {}
      },
      validators: {
        email: {
          "Email can't be empty": notEmptyString,
          'Email format is invalid': emailIsRightFormat
          //'Email not registered!': emailNotRegistered
        },
        password: {
          "Password can't be empty": notEmptyString
        }
      }
    }
  },

  methods: {
    async handleSubmit(e) {
      let target = e.submitter.name
      switch (target) {
        case 'continue-email-button':
          await this.signInEmail(e)
          break
        case 'sign-up-google':
          await this.signInGoogle(e)
          break
        case 'sign-up-facebook':
          await this.signInFaceBook(e)
          break
        case 'sign-up-unstoppable':
          await this.signInUnstoppable(e)
          break
      }
    },

    async signInEmail(e) {
      this.showErrors()

      if (!this.inputsAreValid) return

      this.spinnerActive = true
      await new Promise(r => setTimeout(r, 2000))

      await $anonUserSignIn('emailAndPassword', {
        email: this.form.email.content,
        password: this.form.password.content
      })
        .then(() => {
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {
          alert(err.message)
        })
    },

    async signInGoogle(e) {
      await $anonUserSignIn('google')
        .then(() => {
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {
          alert(err.message)
          spinnerActive == false
        })
    },

    async signInFaceBook(e) {
      await $anonUserSignIn('facebook')
        .then(() => {
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {
          console.log(err)
          alert(err.message)
          //spinnerActive == false
        })
    },

    async signInUnstoppable(e) {
      await $anonUserSignIn('unstoppableDomains')
        .then(() => {
          $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        })
        .catch(err => {
          console.log(err)
          alert(err.message)
          //spinnerActive == false
        })
    },

    async showErrors() {
      Object.values(this.form).forEach(field => (field.active = true))
    },

    redirectToSignUp() {
      this.DonorPortal_RedirectToSignUp()
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
    IconArrow: $getCustomComponent('u-Icons-Arrow'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    BvButton: $getCustomComponent('u-Components-Button'),
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

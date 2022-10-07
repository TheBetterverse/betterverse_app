<!-- Donor Portal Reset Password Form -->

<template>
  <div class="w-100">
    <!-- For small displays -->
    <header class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>
      <b-row class="mt-1 mb-5 d-flex">
        <b-col class="d-flex align-items-center">
          <icon-betterverse width="32" heigth="32" />
        </b-col>
        <b-col class="text-right d-flex justify-content-end">
          <small
            >Don't have an account?<br /><u><a href="#" @click="DonorPortal_RedirectToSignUp">Create account</a></u></small
          >
        </b-col>
      </b-row>
    </header>

    <!--Change Password-->
    <div v-if="$route.query.token">
      <section name="title" class="mb-5">
        <b-container>
          <b-row class="my-3">
            <p>Hello,</p>
          </b-row>
          <b-row>
            <slot>
              <h1>Let's reset your <b>password</b></h1>
              <p>
                Write your new one below.
              </p>
            </slot>
          </b-row>
        </b-container>
      </section>
      <form @submit.prevent>
        <section name="form-inputs">
          <div class="my-3">
            <bv-input
              label="New password"
              name="password-input"
              type="password"
              placeholder="Define a new password"
              v-model="form.password"
              :validators="validators.password"
            >
            <icon-lock />
          </bv-input>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <p style="line-height: 16px" v-if="resetSuccess == true">
              <small>
                <b>Password changed! Redirecting you to login.</b>
              </small>
            </p>
          </div>
          <bv-button @click="reset"
            secondary
            v-if="resetSuccess == false"
          >
            <template #default> <p>Update password</p></template>
            <template #right-icon>
              <icon-rightarrow color="white"></icon-rightarrow>
            </template>
          </bv-button>
        </div>
      </section>
    </div>

    <!--Password Reset Request-->
    <div v-else>
      <section name="title" class="mb-5">
        <b-container>
          <b-row class="my-3">
            <p>Reset Password</p>
          </b-row>
          <b-row>
            <slot>
              <h1>Forgot your <b>password?</b></h1>
              <p>
                Happens to the best of us. Enter the email you joined with and we’ll send you a reset code.
              </p>
            </slot>
          </b-row>
        </b-container>
      </section>
      <form @submit.prevent>
        <section name="form-inputs">
          <div class="my-3">
            <bv-input
              label="Email address"
              name="email-input"
              type="text"
              placeholder="Type e-mail address"
              v-model="form.email"
              :validators="validators.email"
            >
              <icon-mail />
            </bv-input>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <p style="line-height: 16px" v-if="linkSent == true">
                <small>
                  <b>Reset link sent!</b>
                </small>
              </p>
            </div>
            <div v-if="validEmail == true && linkSent == false">
              <bv-button  @click="sendLink" 
                secondary
              >
                <template  #default> Reset my password </template>
                <template #right-icon>
                  <icon-rightarrow color="white"></icon-rightarrow>
                </template>
              </bv-button>
            </div>
          </div> 
      <div>


        </section>
        <!-- For large displays -->
        <footer class="mt-9 d-none d-lg-block">
        </footer>
      </form>
    </div>

  </div>
</template>



<script>
async function emailIsRightFormat(subject) {
  await $setUser('email', subject)
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    subject
  )
}

function emailDontExist(subject) {
  const users = $getGrid('users')

  for (let i = 0; i < users.length; i++) {
    if (users[i].$user$display == subject) {
      this.validEmail = true

      return true
    }
  }
  this.validEmail = false

  return false
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
  props: ['DonorPortal_RedirectToSignUp'],
  data() {
    return {
      linkSent: false,
      resetSuccess: false,
      validEmail: false,
      form: {
        email: {},
        password: {}
      },
      validators: {
        email: {
          "Field can't be empty": notEmptyString,
          'Email not registered': emailDontExist.bind(this),
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
    sendLink() {
      spinnerActive = true;
      this.$parent.callWf({
        workflow: '-N9b4lSJzR5UT35a_Odh',
        payload: {
          email: this.form.email.content,
        }
      }).then((res) => {
        if (res.sent) this.linkSent = true
      })
    },
    reset() {
      console.log(this.form.password)
      this.$parent.callWf({
        workflow: '-N9b4lSJzR5UT35a_Odh',
        payload: {
          password: this.form.password.content,
          token: this.$route.query.token,
        }
      }).then((res) => {
        if (res.reset) this.resetSuccess = true
        setTimeout(() => {     
          $setCurrentSubTab('-N4IRMyIAw-t4q0VNr0C','-Mx_5FLL2jlxjXYUMdIL')
        }, 5000);
      })
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
    IconRightarrow: $getCustomComponent('u-Icons-ArrowRight'),
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

div.status-bar-clearance {
  height: 44px;
}
</style>

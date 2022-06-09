<template>
  <b-form @submit.prevent="signUp" :disabled="$getGlobalModel('signUpProcess')">
    
    <b-form-group label="Continue with email">
      <div class="d-inline-flex w-100 form-input-div">

        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M9 1L7 1C5.13623 1 4.20435 1 3.46927 1.30448C2.48915 1.71046 1.71046 2.48915 1.30448 3.46927C1 4.20435 1 5.13623 1 7C1 8.86377 1 9.79565 1.30448 10.5307C1.71046 11.5108 2.48915 12.2895 3.46927 12.6955C4.20435 13 5.13623 13 7 13H9C10.8638 13 11.7956 13 12.5307 12.6955C13.5108 12.2895 14.2895 11.5108 14.6955 10.5307C15 9.79565 15 8.86377 15 7C15 5.13623 15 4.20435 14.6955 3.46927C14.2895 2.48915 13.5108 1.71046 12.5307 1.30448C11.7956 1 10.8638 1 9 1Z" stroke="black" stroke-width="1.2"/>
        </svg>

        <b-form-input
          v-model="email"
          :disabled="$getGlobalModel('signUpProcess')"
          autocomplete="current-email"
          placeholder="Type email address"
          @input="clearErrors(emailErr)"
          class="px-2"
        ></b-form-input>

        <svg v-if="emailErr" class="input-status-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#E15564"/>
        </svg>

      </div>
    </b-form-group>

    <b-container>
      <b-row v-for="err in emailErr" v-text="err" class="error-message mb-3" />
    </b-container>

    <b-form-group label="Password">
      <div class="d-inline-flex w-100 form-input-div">

        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M9 1L7 1C5.13623 1 4.20435 1 3.46927 1.30448C2.48915 1.71046 1.71046 2.48915 1.30448 3.46927C1 4.20435 1 5.13623 1 7C1 8.86377 1 9.79565 1.30448 10.5307C1.71046 11.5108 2.48915 12.2895 3.46927 12.6955C4.20435 13 5.13623 13 7 13H9C10.8638 13 11.7956 13 12.5307 12.6955C13.5108 12.2895 14.2895 11.5108 14.6955 10.5307C15 9.79565 15 8.86377 15 7C15 5.13623 15 4.20435 14.6955 3.46927C14.2895 2.48915 13.5108 1.71046 12.5307 1.30448C11.7956 1 10.8638 1 9 1Z" stroke="black" stroke-width="1.2"/>
        </svg>

        <b-form-input
          v-model="password"
          :disabled="$getGlobalModel('signUpProcess')"
          placeholder="Type password"
          autocomplete="current-password"
          type="password"
          @input="clearErrors(passwordErr)"
          class="px-2"
        ></b-form-input>

        <svg v-if="passwordErr" class="input-status-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#E15564"/>
        </svg>

      </div>
    </b-form-group>

    <b-container>
      <b-row v-for="err in passwordErr" v-text="err" class="error-message mb-3" />
    </b-container>

    <b-form-group label="Confirm password">
      <div class="d-inline-flex w-100 form-input-div">

        <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M9 1L7 1C5.13623 1 4.20435 1 3.46927 1.30448C2.48915 1.71046 1.71046 2.48915 1.30448 3.46927C1 4.20435 1 5.13623 1 7C1 8.86377 1 9.79565 1.30448 10.5307C1.71046 11.5108 2.48915 12.2895 3.46927 12.6955C4.20435 13 5.13623 13 7 13H9C10.8638 13 11.7956 13 12.5307 12.6955C13.5108 12.2895 14.2895 11.5108 14.6955 10.5307C15 9.79565 15 8.86377 15 7C15 5.13623 15 4.20435 14.6955 3.46927C14.2895 2.48915 13.5108 1.71046 12.5307 1.30448C11.7956 1 10.8638 1 9 1Z" stroke="black" stroke-width="1.2"/>
        </svg>

        <b-form-input
          v-model="passwordConfirm"
          :disabled="$getGlobalModel('signUpProcess')"
          placeholder="Type password"
          type="password"
          @input="clearErrors(confirmPassErr)"
          class="px-2"
        ></b-form-input>

        <svg v-if="confirmPassErr" class="input-status-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="8" fill="#E15564"/>
        </svg>
      
      </div>

    </b-form-group>

    <b-container>
      <b-row v-for="err in confirmPassErr" v-text="err" class="error-message mb-3" />
    </b-container>


    <b-form-group id="buttons-div" class="d-flex justify-content-end">
      <b-button
        variant="primary"
        type="submit"
        :disabled="$getGlobalModel('signUpProcess')"
        class="d-flex align-items-center"
        style="background: black; color: white;"
      >
        <b-spinner v-if="$getGlobalModel('signUpProcess')" small></b-spinner>
        <span v-else>Continue with email ⭢</span>        
      </button>
    </b-form-group>


    <div class="mt-5">Or continue with</div>
    <b-form-group class="socials my-1 d-flex w-100">
      <b-container>
        <b-row>

          <b-button variant="outline-primary" class="d-flex mr-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              width="16"
              height="16"
            />
            <span class="d-none d-md-block ml-2">Google</span>
          </b-button>

          <b-button variant="outline-primary" class="d-flex mr-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
              width="16"
              height="16"
            />
            <span class="d-none d-md-block ml-2">Facebook</span>
          </b-button>

          <b-button variant="outline-primary" class="d-flex mr-2">
            <img
              src="https://camo.githubusercontent.com/323fb0ba057ee8c0b4fdd6e89e35967cb30cfcfd/68747470733a2f2f7669676e657474652e77696b69612e6e6f636f6f6b69652e6e65742f7468652d6d696e6572732d686176656e2d70726f6a6563742f696d616765732f642f64642f446973636f72642e706e672f7265766973696f6e2f6c61746573743f63623d3230313730333038303333353436"
              width="16"
              height="16"
            />
            <span class="d-none d-md-block ml-2">Discord</span>
          </b-button>

        </b-row>
      </b-container>
    </b-form-group>

  </b-form>
</template>

<script>
const ERROR_MESSAGE_TIMEOUT = 6000  // in miliseconds

module.exports = {
  data() {
    return {
      email: null,
      password: null,
      passwordConfirm: null,
      emailErr: [],
      passwordErr: [],
      confirmPassErr: [],
    }
  },

  methods: {
    signUp() {
      if (!this.email) this.displayErrorMessage(this.emailErr, 'E-mail is required')
      if (!this.password) this.displayErrorMessage(this.passwordErr, 'Password is required')
      if (this.password !== this.passwordConfirm) this.displayErrorMessage(this.confirmPassErr, 'Passwords doesn\'t match')

      if (this.hasInputErrors) return

      $setGlobalMode('signUpProcess', true)

      $anonUserToPermanent('emailAndPassword', {
        email: this.email,
        password: this.password,
      }).then(() => {
        $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        $setGlobalMode('signUpProcess', false)
      }).catch(err => {
        $setGlobalMode('signUpProcess', false)

        alert(err.message)
      })
    },

    signUpWithGoogle() {
      $setGlobalMode('signUpProcess', true)

      $anonUserToPermanent('google').then(() => {
        $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        $setGlobalMode('signUpProcess', false)
      }).catch(err => {
        $setGlobalMode('signUpProcess', false)

        alert(err.message)
      })
    },

    signUpWithFaceBook() {
      throw `Signing up with Facebook is not implemented`
    },

    signUpWithDiscord() {
      throw "Signing up with Discord is not implemented"
    },

    displayErrorMessage(errMsgArray, errMsg) {
      if (errMsgArray.includes(errMsg)) return

      errMsgArray.push(errMsg)

      setTimeout(() => {
        errMsgArray.splice(errMsgArray.indexOf(errMsg), 1)
      }, ERROR_MESSAGE_TIMEOUT)
    },

    clearErrors(errMsgArray) {
      errMsgArray.splice(0, errMsgArray.length)
    }
  },

  computed: {
    hasInputErrors() {
      return (this.emailErr.length ? true : false)
      || (this.passwordErr.length ? true : false)
      || (this.confirmPassErr.length? true : false)
    }
  }
}
</script>
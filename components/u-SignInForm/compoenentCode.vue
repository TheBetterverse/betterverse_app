<template>
  <b-form @submit.prevent="signIn" :disabled="$getGlobalModel('signInProcess')">
    <b-form-group label="Email address:">
      <b-form-input
        v-model="email"
        :disabled="$getGlobalModel('signInProcess')"
      />
    </b-form-group>
    <b-form-group label="Password:">
      <b-form-input
        v-model="password"
        :disabled="$getGlobalModel('signInProcess')"
        type="password"
      />
    </b-form-group>

    <b-button
      variant="primary"
      type="submit"
      :disabled="$getGlobalModel('signInProcess')"
    >
      <b-spinner v-if="$getGlobalModel('signInProcess')" small></b-spinner>
      <span>Sign In</span>
    </b-button>

    <b-form-group>
      <a href="#" @click.prevent="signInWithGoogle">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          width="35"
          height="35"
        />
      </a>
    </b-form-group>

  </b-form>
</template>
<script>
module.exports = {
  data() {
    return {
      email: null,
      password: null,
      passwordConfirm: null,
    }
  },
  methods: {
    signIn() {
      const errMsg = []
      if (!this.email) errMsg.push('E-mail is required')
      if (!this.password) errMsg.push('Password is required')
      if (errMsg.length) {
        alert(errMsg.join('\n'))
        return
      }
      $setGlobalModel('signInProcess', true)
      $anonUserSignIn('emailAndPassword', {
        email: this.email,
        password: this.password,
      }).then(() => {
        $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        $setGlobalModel('signInProcess', false)
      }).catch(err => {
        $setGlobalModel('signInProcess', false)
        alert(err.message)
      })
    },
    signInWithGoogle() {
      $setGlobalModel('signInProcess', true)
      $anonUserSignIn('google').then(() => {
        $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
        $setGlobalModel('signInProcess', false)
      }).catch(err => {
        $setGlobalModel('signInProcess', false)
        alert(err.message)
      })
    },
  },
}
</script>
<!-- u-Components-ResetPasswordButton -->

<template>
  <div style="width: 100%">
    <bv-button
      v-if="linkSent == false"
      secondary
      @click="sendLink"
      title="Email reset password link button"
    >
      Email me a reset password link
      <b-spinner
        v-if="spinnerActive == true"
        small
        label="Small spinner"
        style="margin-left: 7px"
      ></b-spinner>
    </bv-button>

    <div v-if="linkSent == true">
      <p>
        Reset link sent to <b>{{ fbUser.email }}</b
        >!
      </p>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      linkSent: false,
      spinnerActive: false
    }
  },

  methods: {
    sendLink() {
      this.spinnerActive = true
      this.$parent
        .callWf({
          workflow: '-N9b4lSJzR5UT35a_Odh',
          payload: {
            email: fbUser.email
          }
        })
        .then(res => {
          if (res.sent) this.linkSent = true
        })
    }
  },

  components: {
    BvButton: $getCustomComponent('u-Components-Button')
  }
}
</script>

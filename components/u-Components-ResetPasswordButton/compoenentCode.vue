<template>
  <div style="width: 100%;">
    <bv-button v-if="linkSent == false" secondary @click="sendLink" > 
      Email me a reset password link 
      <b-spinner v-if="spinnerActive == true" small label="Small spinner" style="margin-left: 7px;"></b-spinner>

    </bv-button>

    <div v-if="linkSent == true">  
      <p>Reset link sent to <b>{{fbUser.email}}</b>!</p>
    </div>
  </div>
</template>



<script>


module.exports = {

  data() {
    return {
      linkSent: false,
      spinnerActive: false,
    }
  },

  methods: {
    sendLink() {
      this.spinnerActive = true;
      this.$parent.callWf({
        workflow: '-N9b4lSJzR5UT35a_Odh',
        payload: {
          email: fbUser.email,
        }
      }).then((res) => {
        if (res.sent) this.linkSent = true
      })
    },
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

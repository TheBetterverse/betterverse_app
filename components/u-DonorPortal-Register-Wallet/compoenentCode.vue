<!-- Donor Portal Personal Info Form -->

<template>
  <div class="w-100">
    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5 d-flex">
        <b-col class="d-flex align-items-center md-logo">
          <icon-betterverse width="32" heigth="32" />
        </b-col>

        <b-col class="text-right d-flex justify-content-end">
          <small>Have an account?<br /><a href="#">Log in</a></small>
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Create Account > Personal Info <b>> Wallet</b></div>
    <div class="my-3 mb-4">
      <slot>
        <h1>A few things about <b>yourself</b></h1>
        <p>
          Here will say something about this and how it must be extraordinay.
        </p>
      </slot>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <div v-if="walletIsConnected">
        <small>Wallet connected</small>
        <div class="py-2 d-flex justify-content-lg-between">
          <button-pill name="sign-up-google" class="w-100" checkmark>
            <template v-slot:icon> <icon-torus></icon-torus> </template>
            <template> 0x6dA...fNa </template>
          </button-pill>
        </div>

        <div class="py-2 d-flex align-items-center justify-content-between">
          <div>
            <div>
              <small><b>Balance</b></small>
            </div>
            <div class="d-flex align-items-center">
              <h3>
                70,536.00
                <icon-usdc></icon-usdc>
              </h3>
            </div>
          </div>

          <div>
            <button-pill id="top-up-button">Top up wallet</button-pill>
          </div>
        </div>

        <div class="py-3 d-flex align-items-center justify-content-between">
          <div class="d-flex">
            <small>
              You're all set!<br />
              Go explore!
            </small>
          </div>

          <div>
            <button-continue>Let's go!</button-continue>
          </div>
        </div>
      </div>

      <div v-else>
        <small>Connect existing wallet</small>
        <div class="d-flex justify-content-between w-100 mt-2 mb-3">
          <button-pill name="sign-up-google">
            <template v-slot:icon> <icon-metamask></icon-metamask> </template>
            <template> Metamask </template>
          </button-pill>

          <button-pill name="sign-up-facebook">
            <template v-slot:icon> <icon-torus></icon-torus> </template>
            <template> Torus </template>
          </button-pill>

          <button-pill name="sign-up-discord">
            <template v-slot:icon> <icon-coinbase></icon-coinbase> </template>
            <template> Coinbase </template>
          </button-pill>
        </div>

        <small>Or create wallet with</small>
        <div class="d-flex justify-content-lg-between w-100 py-2">
          <button-pill name="sign-up-google" class="w-100">
            <template v-slot:icon> <icon-torus></icon-torus> </template>
            <template> Torus </template>
          </button-pill>
        </div>

        <div class="d-flex justify-content-between w-100 py-5">
          <div class="d-flex align-items-center">
            <small>
              This step is optional!<br />
              You can jump right into the action
            </small>
          </div>
          <div>
            <button-continue>Skip step</button-continue>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  methods: {
    async handleSubmit(e) {}
  },

  computed: {
    walletIsConnected() {
      return true
    }
  },

  components: {
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    IconMetamask: $getCustomComponent('u-Icons-Metamask'),
    IconTorus: $getCustomComponent('u-Icons-Torus'),
    IconCoinbase: $getCustomComponent('u-Icons-Coinbase'),
    IconUsdc: $getCustomComponent('u-Icons-USDC'),
    ButtonContinue: $getCustomComponent('u-Buttons-LeftArrow'),
    ButtonPill: $getCustomComponent('u-Buttons-Pill')
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

button.bv-pillbutton {
  padding: 6px 16px !important;
}

div.bv-pillbutton-slot {
  display: flex !important;
}
</style>

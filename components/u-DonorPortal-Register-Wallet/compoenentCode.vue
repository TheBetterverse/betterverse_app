<!-- Donor Portal Personal Info Form -->

<template>
  <div class="w-100">
    <!-- For small displays -->
    <header class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-1 d-flex">
        <b-col class="d-flex align-items-center md-logo">
          <icon-betterverse width="32" heigth="32" />
        </b-col>
      </b-row>
    </header>

    <section name="title" class="mb-5">
      <b-container>
        <b-row class="my-3">
          <p>Create Account > Personal Info <b>> Wallet</b></p>
        </b-row>
        <b-row>
          <slot>
            <h1>Want to set up your <b>wallet?</b></h1>
            <p>
              You'll need a wallet and some USDC to start donating. Haven’t got
              one yet? No worries, you can create one and get donating in no
              time.
            </p>
          </slot>
        </b-row>
      </b-container>
    </section>

    <form @submit.prevent="$emit('submit', $event)">
      <section name="form-inputs">
        <small>Connect existing wallet</small>
        <div
          id="bv__registerwallet__connectwallet"
          class="d-flex justify-content-between w-100 mt-2 mb-4"
        >
          <bv-button name="connect-metamask" type="submit">
            <template v-slot:left-icon>
              <icon-metamask />
            </template>
            <template> <p>Metamask</p> </template>
          </bv-button>

          <bv-button name="connect-torus" type="submit">
            <template v-slot:left-icon> <icon-torus /> </template>
            <template> <p>Torus</p> </template>
          </bv-button>

          <!--bv-button name="connect-coinbase" type="submit">
            <template v-slot:left-icon>
              <icon-coinbase />
            </template>
            <template> <p>Coinbase</p> </template>
          </bv-button-->
        </div>

        <small>Or create wallet with</small>

        <div>
          <bv-button
            name="connect-slide"
            type="submit"
            id="bv__register__connectslide"
          >
            <template #left-icon> <icon-slide /> </template>
            <template> <p>Slide</p> </template>
          </bv-button>
        </div>

        <hr class="mt-5 mb-3" />

        <div class="w-100 my-4 d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <small>
              This step is optional!<br />
              You can jump right into the action
            </small>
          </div>
          <div>
            <bv-button
              @click="DonorPortal_CompleteProfile"
              secondary
              name="skip-step"
              type="submit"
            >
              <template #default> <p>Skip step</p> </template>
              <template #right-icon>
                <div id="bv__right__arrow">
                  <icon-arrow right />
                </div>
                <div
                  id="bv__spinner"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  style="display: none"
                ></div>
              </template>
            </bv-button>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
module.exports = {
  props: ['DonorPortal_CompleteProfile'],
  data() {
    return {
      wallet: {
        provider: undefined,
        address: undefined,
        balance: 0
      }
    }
  },

  computed: {
    walletIsConnected() {
      return this.wallet.address !== undefined
    },

    formattedAddress() {
      let address = this.wallet.address

      if (!address.startsWith('0x')) address = `0x${address}`

      return `${address.slice(0, 5)}...${address.slice(address.length - 3)}`
    },

    formattedBalance() {
      let balance = this.wallet.balance / 100
      return balance.toLocaleString('en')
    }
  },

  components: {
    IconMetamask: $getCustomComponent('u-Icons-Metamask'),
    IconTorus: $getCustomComponent('u-Icons-Torus'),
    IconCoinbase: $getCustomComponent('u-Icons-Coinbase'),
    IconUsdc: $getCustomComponent('u-Icons-USDC'),
    IconPlus: $getCustomComponent('u-Icons-Plus'),
    IconArrow: $getCustomComponent('u-Icons-Arrow'),
    IconCheckmark: $getCustomComponent('u-Icons-Checkmark'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    IconSlide: $getCustomComponent('u-Icons-Slide'),
    BvButton: $getCustomComponent('u-Components-Button')
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

button[name='create-torus'] {
  width: 100% !important;
}

section[name='form-input'] > hr,
section[name='wallet-info'] > hr {
  background: #000000;
  opacity: 0.1;
}

#bv__registerwallet__connectwallet {
  gap: 15px;
}

#bv__registerwallet__connectwallet > button {
  width: 100%;
}

#bv__register__connectslide {
  width: 100%;
}
</style>

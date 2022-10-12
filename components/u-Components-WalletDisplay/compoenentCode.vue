<template>
  <u-Components-Button
    primary
    name="bv-walletdisplay"
    class="bv__walletdisplay"
    :class="{ error: state >= STATES.ERROR }"
    @click="$emit('click', $event)"
  >
    <template v-if="state === STATES.LOADING">
      <div class="bv__walletdisplay__inner bv__walletdisplay__loading">
        <u-Icons-Wallet></u-Icons-Wallet>
        <p>
          Loading wallet
          <span class="bv__animations__opacitywave">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </p>
      </div>
    </template>

    <template v-if="state === STATES.WALLET_NOT_CONNECTED">
      <div
        class="bv__walletdisplay__inner bv__walletdisplay__walletnotconnected"
      >
        <u-Icons-Wallet></u-Icons-Wallet>
        <p>Connect wallet</p>
      </div>
    </template>

    <template v-if="state === STATES.WALLET_CONNECTED">
      <div class="bv__walletdisplay__inner bv__walletdisplay__walletconnected">
        <span>
          <u-Icons-Metamask v-if="provider === 'metamask'"></u-Icons-Metamask>
          <u-Icons-Torus v-else-if="provider === 'torus'"></u-Icons-Torus>
          <u-Icons-Coinbase
            v-else-if="provider === 'coinbase'"
          ></u-Icons-Coinbase>
          <u-Icons-Slide v-else-if="provider === 'slide'"></u-Icons-Slide>
          <u-Icons-Wallet v-else></u-Icons-Wallet>
        </span>

        <span v-if="address" class="bv__walletdisplay__address">
          <p>{{ formattedAddress }}</p>
        </span>

        <span v-else class="bv__walletdisplay__balance">
          <p>{{ balanceValue }}</p>
          <u-Icons-Usdc height="20px" width="20px" />
        </span>

        <span v-if="checkmark" class="bv__walletdisplay__checkmark">
          <u-Icons-Checkmark shown isvalid />
        </span>
      </div>
    </template>

    <template v-if="state >= STATES.ERROR">
      <div class="bv__walletdisplay__inner bv__walletdisplay__error">
        <p>Wallet Error: {{ state }}</p>
        <u-Icons-Checkmark shown />
      </div>
    </template>
  </u-Components-Button>
</template>

<script>
module.exports = {
  props: {
    wallet: {
      type: Promise,
      default: new Promise((resolve => resolve()))
    },

    address: {
      type: Boolean,
      default: false
    },

    balance: {
      type: Boolean,
      default: true
    },

    checkmark: {
      type: Boolean,
      default: false
    }
  },

  components: {
    uComponentsButton: $getCustomComponent('u-Components-Button'),
    uIconsWallet: $getCustomComponent('u-Icons-Wallet'),
    uIconsUsdc: $getCustomComponent('u-Icons-USDC'),
    uIconsMetamask: $getCustomComponent('u-Icons-Metamask'),
    uIconsTorus: $getCustomComponent('u-Icons-Torus'),
    uIconsCoinbase: $getCustomComponent('u-Icons-Coinbase'),
    uIconsSlide: $getCustomComponent('u-Icons-Slide'),
    uIconsCheckmark: $getCustomComponent('u-Icons-Checkmark')
  },

  computed: {
    formattedAddress() {
      let address = this.wallet_address
      let len = address.length
      return `${address.slice(0, 5)}...${address.slice(len - 3, len)}`
    }
  },

  methods: {
    async updateComponent() {
      let result = await this.wallet

      if (!result) {
        this.state = 404
        return
      }

      if (!result.address) this.state = this.STATES.WALLET_NOT_CONNECTED
      else this.state = this.STATES.WALLET_CONNECTED

      this.wallet_address = result.address
      this.provider = result.provider
      this.balanceValue = result.balance
    }
  },

  data() {
    return {
      wallet_address: null,
      provider: null,
      balanceValue: this.balance,
      state: 0,

      STATES: {
        LOADING: 0,
        WALLET_NOT_CONNECTED: 1,
        WALLET_CONNECTED: 2,
        ERROR: 3
      }
    }
  },

  async created() {
    await this.updateComponent()
  },

  async beforeUpdate() {
    await this.updateComponent()
  }
}
</script>

<style>
.bv__walletdisplay.error {
  color: #c72525;
  border: 1px solid #c72525;
}

.bv__walletdisplay__inner {
  display: flex;
  gap: 8px;
}

.bv__walletdisplay__balance {
  display: flex;
  gap: 6px;
}
</style>

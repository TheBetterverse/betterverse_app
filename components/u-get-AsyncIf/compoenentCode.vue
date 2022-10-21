<template>
  <div v-if="result" class="bv__getasyncif">
    <slot>Displayed</slot>
  </div>
</template>

<script>
module.exports = {
  props: {
    asyncif: new Promise(resolve => resolve(false))
  },

  async created() {
    this.result = await this.asyncif
  },

  async updated() {
    this.result = await this.asyncif
  },

  data() {
    return {
      result: false
    }
  }
}
</script>

<style></style>

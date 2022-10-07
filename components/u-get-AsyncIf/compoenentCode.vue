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
    console.log('creating')
    console.log(this.result)
  },

  async updated() {
    this.result = await this.asyncif
    console.log('updating')
    console.log(this.result)
  },

  data() {
    return {
      result: false
    }
  }
}
</script>

<style></style>

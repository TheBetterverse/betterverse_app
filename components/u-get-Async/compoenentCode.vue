<template>
  <span v-if="result" class="bv__getasync">
    {{ result }}
  </span>

  <span v-else>
    <slot name="default"></slot>
  </span>
</template>

<script>
module.exports = {
  props: {
    data: {
      type: Promise,
      default: ''
    }
  },

  data() {
    return {
      result: null
    }
  },

  watch: {
    async data() {
      this.result = await this.data
    }
  },

  async created() {
    this.result = await this.data
  }
}
</script>

<style></style>

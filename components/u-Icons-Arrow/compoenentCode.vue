<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ transform: `rotate(${rotation})` }"
  >
    <path d="M10 16L10 4" :stroke="color" stroke-width="1.2" />
    <path d="M5 11L10 16L15 11" :stroke="color" stroke-width="1.2" />
  </svg>
</template>

<script>
module.exports = {
  props: {
    color: {
      type: String,
      default: '#ECEAE3'
    },

    height: {
      type: String,
      default: '20px'
    },

    width: {
      type: String,
      default: '20px'
    },

    up: {
      type: Boolean,
      default: false
    },

    right: {
      type: Boolean,
      default: false
    },

    left: {
      type: Boolean,
      default: false
    },

    down: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      rotation: 0
    }
  },

  created() {
    if (this.up) this.rotation = '180deg'
    else if (this.left) this.rotation = '90deg'
    else if (this.right) this.rotation = '-90deg'
  }
}
</script>

<style></style>

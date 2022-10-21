<template>
  <span class="d-flex align-items-center justify-content-center">
    <img
      :height="height"
      :width="width"
      src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
      class="d-flex align-items-center justify-content-center"
    />
  </span>
</template>

<script>
module.exports = {
  props: {
    height: {
      type: String,
      default: '16'
    },
    width: {
      type: String,
      default: '16'
    }
  }
}
</script>

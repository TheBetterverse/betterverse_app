<template>
  <img
    :height="height"
    :width="width"
    src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
  />
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

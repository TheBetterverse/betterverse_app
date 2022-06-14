<template>
  <img
    :height="height"
    :width="width"
    src="https://cdn-icons-png.flaticon.com/512/145/145802.png"
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

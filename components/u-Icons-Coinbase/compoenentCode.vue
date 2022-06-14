<template>
  <img
    :height="height"
    :width="width"
    src="https://i.ibb.co/1bfjnsZ/image-2.png"
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

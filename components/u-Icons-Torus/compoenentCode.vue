<template>
  <span class="d-flex align-items-center justify-content-center">
    <img
      :height="height"
      :width="width"
      src="https://i.ibb.co/Qp5H1LS/image-2.png"
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

<template>
  <span class="d-flex align-items-center justify-content-center">
    <img
      :height="height"
      :width="width"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
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

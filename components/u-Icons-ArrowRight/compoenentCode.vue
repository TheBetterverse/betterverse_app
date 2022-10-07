<template>
  <span class="d-flex align-items-center justify-content-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M16 10L4 10" :stroke="color" stroke-width="1.2" />
      <path d="M11 15L16 10L11 5" :stroke="color" stroke-width="1.2" />
    </svg>
  </span>
</template>

<script>
module.exports = {
  props: {
    color: {
      type: String,
      default: '#ECEAE3'
    }
  }
}
</script>

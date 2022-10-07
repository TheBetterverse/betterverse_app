<template>
  <span class="d-flex align-items-center justify-content-center">
    <svg
      v-if="outline"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      class="d-flex align-items-center justify-content-center"
    >
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        rx="4"
        stroke="black"
        stroke-width="1.3"
      />
      <path d="M7 10.65H13V9.35H7V10.65Z" fill="black" />
      <path d="M9.35 7V13H10.65V7H9.35Z" fill="black" />
    </svg>
    <span v-else class="user-select-none"> + </span>
  </span>
</template>

<script>
module.exports = {
  props: {
    outline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

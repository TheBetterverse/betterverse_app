<!-- Checkmark Icon -->

<template>
  <span class="d-flex align-items-center justify-content-center">
    <svg
      v-if="isvalid && shown"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="8" fill="#25C791" />
      <path
        d="M6.83309 10.5L8.99976 12.5L13.3331 7.5"
        stroke="white"
        stroke-width="1.3"
      />
    </svg>

    <svg
      v-else-if="!isvalid && shown"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <circle cx="10" cy="10" r="8" fill="#E15564" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.9192 6.91924L6.91924 13.9192L6 13L13 6L13.9192 6.91924Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.91924 6L13.9192 13L13 13.9192L6 6.91924L6.91924 6Z"
        fill="white"
      />
    </svg>
  </span>
</template>

<script>
module.exports = {
  props: {
    shown: {
      type: Boolean,
      default: false
    },
    isvalid: {
      type: Boolean,
      default: false
    }
  }
}
</script>

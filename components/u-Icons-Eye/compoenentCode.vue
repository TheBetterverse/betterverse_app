<!-- EyeIcon.vue -->

<script>
module.exports = {
  props: {
    shown: Boolean
  }
}
</script>

<template>
  <svg
    v-if="shown"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 4C14.5 4 17 9 17 10C17 11 14.5 16 10 16C5.5 16 3 11 3 10C3 9 5.5 4 10 4Z"
      stroke="black"
      stroke-width="1.2"
    />
    <circle cx="10" cy="10" r="3" stroke="black" stroke-width="1.2" />
    <line
      x1="4.84853"
      y1="5"
      x2="15"
      y2="15.1515"
      stroke="black"
      stroke-width="1.2"
      stroke-linecap="round"
    />
  </svg>

  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 4C14.5 4 17 9 17 10C17 11 14.5 16 10 16C5.5 16 3 11 3 10C3 9 5.5 4 10 4Z"
      stroke="black"
      stroke-width="1.2"
    />
    <circle cx="10" cy="10" r="3" stroke="black" stroke-width="1.2" />
  </svg>
</template>

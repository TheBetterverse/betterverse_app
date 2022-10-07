<template>
  <span class="d-flex align-items-center justify-content-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect
        x="3.5"
        y="11.5"
        width="5"
        height="5"
        rx="1.5"
        :stroke="color"
        stroke-width="1.2"
      />
      <rect
        x="11.5"
        y="11.5"
        width="5"
        height="5"
        rx="1.5"
        :stroke="color"
        stroke-width="1.2"
      />
      <rect
        x="3.5"
        y="3.5"
        width="5"
        height="5"
        rx="1.5"
        :stroke="color"
        stroke-width="1.2"
      />
      <rect
        x="11.5"
        y="3.5"
        width="5"
        height="5"
        rx="1.5"
        :stroke="color"
        stroke-width="1.2"
      />
    </svg>
  </span>
</template>

<script>
module.exports = {
  props: {
    color: {
      type: String,
      default: "black"
    }
  }
}
</script>
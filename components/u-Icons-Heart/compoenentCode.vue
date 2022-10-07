<template>
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      :fill="fill"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.8239 16.8934C8.2245 15.923 6.73661 14.781 5.38685 13.4876C4.4379 12.5562 3.71548 11.4207 3.27491 10.1682C2.48211 7.7383 3.40816 4.95658 5.99977 4.13335C7.36182 3.70109 8.85605 4.65052 10.0038 5.49962C11.152 4.65155 12.6323 3.70221 13.9945 4.13335C16.5861 4.95658 17.5188 7.7383 16.726 10.1682C16.2854 11.4207 15.563 12.5562 14.6141 13.4876C13.2643 14.781 11.7764 15.923 10.177 16.8934L10.0038 16.9996L9.8239 16.8934Z"
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
      default: '#ECEAE3'
    },

    fill: {
      type: String,
      default: 'none'
    }
  }
}
</script>

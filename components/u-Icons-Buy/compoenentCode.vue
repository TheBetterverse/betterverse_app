<template>

  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="4" :stroke="color" stroke-width="1.3"/>
    <path d="M7 10.65H13V9.35H7V10.65Z" :fill="color" />
    <path d="M9.35 7V13H10.65V7H9.35Z" :fill="color" />
  </svg>

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

<style>
</style>

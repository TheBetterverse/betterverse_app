<!-- Pill Button With Icon -->

<template>
  <button class="bv-pillbutton d-flex">
    <img :src="icon" width="16" height="16" />
    <span class="d-none d-lg-block"><slot>Error</slot></span>
  </button>
</template>

<script>
module.exports = {
  props: {
    icon: {
      type: String,
      default: 'https://cdn.onlinewebfonts.com/svg/img_331373.png'
    }
  }
}
</script>

<style>
button.bv-pillbutton {
  height: 32px;
  min-width: 32px;

  color: black;
  background: none;

  border: 1px solid black;
  border-radius: 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 6px;
}
</style>

<template>
  <img
    :height="height"
    :width="width"
    src="https://clipground.com/images/discord-icon-png-4.png"
  />
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

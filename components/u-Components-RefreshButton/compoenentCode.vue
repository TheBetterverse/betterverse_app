<template>
  <button
    class="bv__refreshbutton"
    type="button"
    @click="$emit('click', $event)"
  >
    <u-Icons-Refresh class="bv__refreshicon"></u-Icons-Refresh>
  </button>
</template>

<script>
module.exports = {
  components: {
    uIconsRefresh: $getCustomComponent('u-Icons-Refresh')
  }
}
</script>

<style>
.bv__refreshbutton {
  appearance: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bv__refreshicon[state='loading'] {
  animation: spin 1s linear infinite forwards;
}

.bv__refreshicon[state='success'] > * {
  fill: #4cb390;
}

.bv__refreshicon[state='error'] > * {
  fill: #c77171;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<!-- Pill Button With Icon -->

<template>
  <button
    class="bv-pillbutton p-0 px-lg-3 d-flex align-items-center justify-content-center"
  >
    <div v-if="iconleft" class="bv-pillbutton-icon">
      <slot name="icon"></slot>
    </div>
    <div class="bv-pillbutton-slot d-none d-lg-block">
      <slot></slot>
    </div>
    <div v-if="!iconleft" class="bv-pillbutton-icon">
      <slot name="icon"></slot>
    </div>
    <div v-if="checkmark" class="bv-pillbutton-checkmark">
      <icon-checkmark shown isvalid></icon-checkmark>
    </div>
  </button>
</template>

<script>
module.exports = {
  props: {
    icon: {
      type: String,
      default: undefined
    },

    iconleft: {
      type: Boolean,
      default: true
    },

    checkmark: {
      type: Boolean,
      default: false
    }
  },

  components: {
    iconCheckmark: $getCustomComponent('u-Icons-Checkmark')
  }
}
</script>

<style>
div.bv-pillbutton-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

button.bv-pillbutton {
  height: 32px;
  min-width: 32px;
  gap: 6px;
  border: 1px solid black;
  border-radius: 32px;

  color: black;
  background: none;
}
</style>

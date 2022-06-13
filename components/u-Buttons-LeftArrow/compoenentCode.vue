<!-- Continue Button -->

<template>
  <div>
    <b-spinner v-if="$getGlobalModel('signUpProcess')" small></b-spinner>

    <button
      v-else
      :action="action"
      :name="name"
      :disabled="disabled"
      :class="$slots.default ? text_button : round_button"
    >
      <span class="bv-continue-slot">
        <slot v-if="$slots.default"></slot>
      </span>
      <span class="bv-continue-icon">
        <icon-left-arrow />
      </span>
    </button>
  </div>
</template>

<script>
module.exports = {
  props: {
    name: {
      type: String,
      default: 'bv-arrow-button'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    action: {
      type: String,
      default: 'submit'
    }
  },

  data() {
    return {
      round_button: 'bv-continue-button-round',
      text_button: 'bv-continue-button-text'
    }
  },
  components: {
    IconLeftArrow: $getCustomComponent('u-Icons-Leftarrow')
  }
}
</script>

<style>
span.bv-continue-slot {
  display: flex;
  align-items: center;
  justify-content: center;
}

span.bv-continue-icon {
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.bv-continue-button-round {
  color: white;
  background: black;
  min-width: 32px;
  height: 32px;
  border: 1px solid #000000;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.bv-continue-button-text {
  color: white;
  background: black;
  height: 32px;
  padding: 6px 8px 6px 12px;
  gap: 4px;
  border: 1px solid #000000;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

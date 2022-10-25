<template>
  <button
    class="bv__button"
    :name="name"
    :title="title"
    :class="{
      primary,
      secondary,
      tertiary,
      highlight,
      bv__button__singleiicon:
        !$slots['default'] && (!$slots['left-icon'] || !$slots['right-icon'])
    }"
    @click="$emit('click', $event)"
  >
    <span class="bv__button__lefticon" v-if="$slots['left-icon']">
      <slot name="left-icon"></slot>
    </span>

    <span class="bv__button__default" v-if="$slots['default']">
      <slot name="default"></slot>
    </span>

    <span class="bv__button__righticon" v-if="$slots['right-icon']">
      <slot name="right-icon"></slot>
    </span>
  </button>
</template>

<script>
module.exports = {
  props: {
    primary: {
      type: Boolean,
      default: false
    },

    secondary: {
      type: Boolean,
      default: false
    },

    tertiary: {
      type: Boolean,
      default: false
    },

    highlight: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: 'Button'
    }
  }
}
</script>

<style>
button.bv__button {
  width: auto;
  height: 32px;

  margin: 0;
  padding: 0 12px;

  overflow: hidden;
  text-overflow: ellipsis;

  color: black;
  fill: black;
  background: none;
  border: 1px solid black;
  border-radius: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  /* grid-template-columns: repeat(3, max-content); */
}

button.bv__button:hover {
  opacity: 80%;
}

button.bv__button__singleiicon {
  padding: 0;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.bv__button > span {
  height: 100%;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

button.bv__button > span > * {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

button.bv__button.secondary {
  background: black;
  color: var(--offwhite);
}

button.bv__button.secondary:hover {
  background: #333;
  border: 1px solid #333;
}

button.bv__button.secondary:disabled {
  background: #999;
  border: 1px solid #999;
  opacity: 100%;
}

button.bv__button.tertiary {
  background: none;
  border: 1px solid transparent;
}

button.bv__button.tertiary:focus,
button.bv__button.tertiary:hover {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

button.bv__button.tertiary.highlight {
  background: #e3e1db;
}

.bv__button__default {
  display: flex;
  justify-content: flex-start;
}

.bv__button__default > * {
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
}
</style>

<template>
  <span class="bv__inlineinput__wrapper">
    <span class="bv__inlineinput__topspan">
      <p>Type amount here</p>
    </span>

    <span class="bv__inlineinput__main">
      <u-Icons-Usdc class="bv__inlineinput__usdc"></u-Icons-Usdc>
      <span
        contenteditable="true"
        :name="name"
        :id="id"
        @input="$emit('input', $event)"
        class="bv__inlineinput__input"
      >
        {{ value() }}
      </span>
    </span>
  </span>
</template>

<script>
module.exports = {
  props: {
    value: {
      type: Function,
      default() {
        return '10'
      }
    },

    name: {
      type: String,
      default: 'inline-input'
    },

    id: {
      type: String,
      default: 'bv__inlineinput__input'
    }
  },

  components: {
    uIconsUsdc: $getCustomComponent('u-Icons-USDC')
  }
}
</script>

<style>
.bv__inlineinput__wrapper {
  position: relative;
  overflow-x: visible;

  word-break: keep-all;
}

.bv__inlineinput__main {
  position: relative;
  display: inline-flex;
  gap: 6px;
  min-width: 1rem;
}

.bv__inlineinput__main > svg {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  top: 4px;
  width: 28px;
  height: 28px;
}

.bv__inlineinput__input {
  align-items: center;
  justify-content: center;

  position: relative;
  min-width: 1rem;
  bottom: 2px;

  border: none;
  background: #d7d5d0;
  appearance: textfield;
  -moz-appearance: textfield;

  font-weight: 700;
  text-decoration: underline;
  text-align: center;
}

.bv__inlineinput__topspan {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -2rem;

  min-width: max-content;
  width: 100%;
  margin-bottom: 1rem;

  text-align: center;
}

.bv__inlineinput__input::-webkit-outer-spin-button,
.bv__inlineinput__input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: auto;
}

.bv__inlineinput__input:focus {
  outline: none;
}

[contenteditable='true']:empty:before {
  content: attr(value);
  color: gray;
}

[contenteditable='true']:focus {
  outline: none;
  background: #e7c5c0;
}

[contenteditable='true'] br {
  display: none;
}

@media screen and (min-width: 992px) {
  .bv__inlineinput__main > svg {
    width: 48px;
    height: 48px;
    top: 6px;
  }

  .bv__inlineinput__input {
    bottom: 8px;
  }

  .bv__inlineinput__main {
    gap: 10px;
  }
}
</style>

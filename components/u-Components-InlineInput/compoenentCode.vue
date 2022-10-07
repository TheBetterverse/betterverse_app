<template>
  <span class="bv__comps__inlineinputwrapper">
    <span class="bv__comps__topspan">
      <p>Type amount here</p>
    </span>

    <span
      contenteditable="true"
      :name="name"
      :id="id"
      @input="$emit('input', $event)"
      class="bv__comps__inlineinput"
      >{{ value() }}</span
    >
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
      default: 'bv__comps__inlineinput'
    }
  }
}
</script>

<style>
.bv__comps__inlineinputwrapper {
  position: relative;
}

.bv__comps__inlineinput {
  align-items: center;
  justify-content: center;

  position: relative;
  min-width: 1rem;

  border: none;
  background: #d7d5d0;
  -moz-appearance: textfield;

  font-weight: 700;
  text-decoration: underline;
  text-align: center;
}

.bv__comps__topspan {
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

.bv__comps__inlineinput::-webkit-outer-spin-button,
.bv__comps__inlineinput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  width: auto;
}

.bv__comps__inlineinput:focus {
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
</style>

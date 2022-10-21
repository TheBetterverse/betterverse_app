<template>
  <div class="bv__comps__inputwrapper" :class="{ disabled }">
    <button
      type="button"
      class="bv__comps__inputbutton"
      :disabled="value == min() || disabled"
      @click="value <= min() ? min() : value--"
    >
      <p>-</p>
    </button>

    <input
      type="number"
      class="bv__comps__input"
      id="bv__comps__nftcount"
      :name="name"
      :disabled="disabled"
      v-model="value"
      @input="updateValue"
    />

    <button
      type="button"
      class="bv__comps__inputbutton"
      :disabled="value == max() || disabled"
      @click="value >= max() ? max() : value++"
    >
      <p>+</p>
    </button>
  </div>
</template>

<script>
module.exports = {
  props: {
    name: {
      type: String,
      default: 'bv-comps-numberinput'
    },

    min: {
      type: Function,
      default() {
        return 1
      }
    },

    max: {
      type: Function,
      default() {
        return 100
      }
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      value: this.min()
    }
  },

  methods: {
    updateValue() {
      let value = this.value

      if (value === '') {
        this.value = this.min_value
        return
      }

      if (value <= this.min_value) {
        this.value = this.min_value
      } else if (value >= this.max_value) {
        this.value = this.max_value
      }
    }
  },

  computed: {
    min_value() {
      return this.min()
    },

    max_value() {
      return this.max()
    }
  },

  beforeUpdate() {
    this.updateValue()
  },

  created() {
    this.updateValue()
  }
}
</script>

<style>
.bv__comps__inputwrapper {
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background: none;
  border: 1px solid black;
  border-radius: 16px;
  padding: 0 0.25rem;
}

.bv__comps__inputwrapper.disabled {
  opacity: 0.8;
}

.bv__comps__input {
  -moz-appearance: textfield;
  outline: none;
  background: none;
  border: none;
  border-radius: 5px;
  padding: 0 0.25rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
}

.bv__comps__input.disabled {
  color: grey;
  pointer-events: none;
}

.bv__comps__inputbutton {
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background: black;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  user-select: none;
  appearance: none;
}

.bv__comps__inputbutton > * {
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.bv__comps__inputbutton:disabled {
  opacity: 0.2;
}

.bv__comps__inputbutton:focus {
  appearance: none;
  user-select: none;
  background: black;
}

.bv__comps__input:disabled {
  opacity: 0.8;
}

.bv__comps__input::-webkit-outer-spin-button,
.bv__comps__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

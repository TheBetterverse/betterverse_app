<template>
  <div class="bv-cardslider-wrapper">
    <div class="bv-cardslider-header">
      <h2>
        <slot name="title"> Title </slot>
      </h2>

      <div class="bv-cardslider-nav">
        <button title="Slide left" :disabled="disableLeft" @click="slideLeft">
          <u-Icons-Arrow left color="#000"></u-Icons-Arrow>
        </button>
        <button
          title="Slide right"
          :disabled="disableRight"
          @click="slideRight"
        >
          <u-Icons-Arrow right color="#000"></u-Icons-Arrow>
        </button>
      </div>
    </div>

    <hr />

    <div
      :id="sliderId"
      :style="{
        'grid-template-columns': `repeat(auto-fit, ${cardWidth}px)`,
        height: `${cardHeight}px`
      }"
      class="bv-cardslider-content"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    name: {
      type: String,
      default: 'default'
    },

    cardWidth: {
      type: Number,
      default: 400
    },

    cardHeight: {
      type: Number,
      default: 500
    }
  },

  components: {
    uIconsArrow: $getCustomComponent('u-Icons-Arrow'),
    uComponentsButton: $getCustomComponent('u-Components-Button')
  },

  methods: {
    updateHandler() {
      if (!this.sliderElement) return

      let { scrollLeft, offsetWidth, scrollWidth } = this.sliderElement

      this.disableLeft = false
      this.disableRight = false

      if (scrollLeft === 0) this.disableLeft = true
      if (scrollLeft + offsetWidth >= scrollWidth) this.disableRight = true
    },

    updateComponent() {
      this.updateHandler()

      for (let mult = 1; mult < 11; mult++) {
        setTimeout(this.updateHandler, 25 * mult ** 2)
      }
    },

    slideLeft() {
      this.sliderElement.scrollBy({ left: -this.cardWidth, behavior: 'smooth' })
      this.updateComponent()
    },

    slideRight() {
      this.sliderElement.scrollBy({ left: this.cardWidth, behavior: 'smooth' })
      this.updateComponent()
    }
  },

  computed: {
    sliderId() {
      return `bv-cardslider-content-${this.name}`
    },

    sliderElement() {
      return document.getElementById(this.sliderId)
    }
  },

  data() {
    return {
      disableLeft: false,
      disableRight: false
    }
  },

  mounted() {
    let style = document.createElement('style')
    style.innerText = `#${this.sliderId} > * { width: ${this.cardWidth}px }`
    document.head.appendChild(style)

    this.updateComponent()
  }
}
</script>

<style>
.bv-cardslider-wrapper {
  width: 100%;
}

.bv-cardslider-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bv-cardslider-nav {
  display: flex;
  gap: 10px;
}

.bv-cardslider-nav > button {
  appearance: none;
  height: 32px;
  width: 32px;
  border: 1px solid black;
  border-radius: 50%;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bv-cardslider-nav > button:disabled {
  opacity: 50%;
}

.bv-cardslider-content {
  display: grid;
  align-items: flex-start;
  justify-content: start;
  flex-wrap: nowrap;
  grid-auto-flow: column;

  gap: 20px;
  overflow-x: scroll;

  padding: 10px 0;
  scroll-snap-type: x mandatory;
}

.bv-cardslider-content > * {
  scroll-snap-align: start;
}

.bv-cardslider-content::-webkit-scrollbar,
.bv-cardslider-content::-webkit-scrollbar-track,
.bv-cardslider-content::-webkit-scrollbar-thumb {
  display: none;
  visibility: hidden;
}
</style>

<!-- u-Components-TreeAnimation -->

<template>
  <video
    class="bv__treeanimation"
    v-if="imageResult && animationResult"
    :poster="imageResult"
    :src="animationResult"
    :id="id"
    :autoplay="autoplay"
    ref="video"
    preload
    playsinline
    autobuffer
    loop
    muted
    defaultmuted
  ></video>
</template>

<script>
module.exports = {
  props: {
    url: {
      type: Object,
      default: {}
    },

    id: {
      type: String,
      default: ''
    },

    autoplay: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    this.renderImage()
  },

  data() {
    return {
      imageResult: null,
      animationResult: null
    }
  },

  watch: {
    url() {
      this.renderImage()
    }
  },

  methods: {
    async renderImage() {
      this.imageResult = null

      if (!this.url) return

      const gatewayURL = 'https://assets.betterverse.app'
      const response = await fetch(this.url)
      const json = await response.json()

      //Image conversion
      const splitUrl = json.image.split(/\/|\?/)
      const imageUrlcid = splitUrl[2]
      const imageUrlfile = splitUrl[3]
      var convertedImgURL = `${gatewayURL}/ipfs/${imageUrlcid}/${imageUrlfile}`
      const newImageURL = convertedImgURL

      //Animation conversion
      const animSplitUrl = json.animation_url.split(/\/|\?/)
      const animUrlcid = animSplitUrl[2]
      const animUrfile = animSplitUrl[3]
      var convertedAnimURL = `${gatewayURL}/ipfs/${animUrlcid}/${animUrfile}`
      const newAnimationURL = convertedAnimURL

      this.animationResult = await newAnimationURL
      this.imageResult = await newImageURL
    }
  }
}
</script>

<style>
.bv__treeanimation {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bv__treeanimation video[poster] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<!-- u-Components-TreeImage -->

<template>
  <img 
    class="bv__treeimage"
    v-if="imageResult"
    :src="imageResult"
  />
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
    }
  },

  mounted() {
    this.renderImage()
  },

  data() {
    return {
      imageResult: null
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
      const url = window.location.href;

      var isProduction
      if(url.includes("give.betterverse.app")){
        isProduction = true
      }
      else{
        isProduction = false
      }

      if (!this.url) return

      const gatewayURL = 'https://assets.betterverse.app'
      const response = await fetch(this.url)
      const json = await response.json()

      //Image conversion
      if(json.image){
        const splitUrl = json.image.split(/\/|\?/)
        const imageUrlcid = splitUrl[2]
        const imageUrlfile = splitUrl[3]
        var convertedImgURL = `${gatewayURL}/ipfs/${imageUrlcid}/${imageUrlfile}`

        if(isProduction == true){
          const newImageURL = convertedImgURL
          this.imageResult = await newImageURL
        }
        else {
          const ipfsUrl = `https://ipfs.io/ipfs/${imageUrlcid}/${imageUrlfile}`
          this.imageResult = await ipfsUrl
        }
      }
    }
  }
}
</script>

<style>
.bv__treeimage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

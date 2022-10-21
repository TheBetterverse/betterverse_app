<!-- u-Components-TreeAnimation -->

<template>
  <div class="bv__treeanimation">
    <video
      v-if="imageResult && animationResult"
      :poster="imageResult"
      :src="animationResult"
      ref="video"
      preload
      playsinline
      autobuffer
      autoplay
      loop
      muted
      defaultmuted
    ></video>
  </div>
</template>

<script>
module.exports = {
  props: ['url'],

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

      const response = await fetch(this.url)
      const json = await response.json()

      const splitImageURL = json.image.split('ipfs://').pop()
      const newImageURL = 'https://ipfs.io/ipfs/' + splitImageURL

      const splitAnimationURL = json.animation_url.split('ipfs://').pop()
      const newAnimationURL = 'https://ipfs.io/ipfs/' + splitAnimationURL

      this.animationResult = await newAnimationURL
      this.imageResult = await newImageURL
    }

    /*applyRotationControl() {
      var vid = this.$refs.video;
      vid.pause(), $(document).ready(function() {
          $(vid).mousedown(function(e) {
                  if (oldx = 0, $(this).mousemove(function(e) {
                          e.pageX < oldx ? (vid.currentTime = vid.currentTime - i, vid.currentTime <= 0 && (vid.currentTime = vid.duration - i)) : e.pageX > oldx && (vid.currentTime = vid.currentTime + i), oldx = e.pageX
                      }), navigator.userAgent.search("Chrome") >= 0) var i = .06;
                  else if (navigator.userAgent.search("Safari") >= 0) i = .06;
                  else if (navigator.userAgent.search("Firefox") >= 0) i = .06;
                  else i = .05
              }), $(vid).mouseleave(function() {
                  $(this).unbind("mousemove")
              }), $(vid).mouseup(function() {
                  $(this).unbind("mousemove")
              }),
              function e() {
                  window.requestAnimationFrame(e) || window.webkitRequestAnimationFrame(e) || window.mozRequestAnimationFrame(e) || window.oRequestAnimationFrame(e) || window.msRequestAnimationFrame(e)
              }()
          var keyState = {};
          window.addEventListener('keydown', function(e) {
              keyState[e.keyCode || e.which] = !0
          }, !0);
          window.addEventListener('keyup', function(e) {
              keyState[e.keyCode || e.which] = !1
          }, !0);

          function keyLoop() {
              if (keyState[37] || keyState[65]) {
                  vid.currentTime = vid.currentTime - 0.1;
                  if (vid.currentTime <= 0) {
                      vid.currentTime = vid.duration - 0.1
                  }
              }
              if (keyState[39] || keyState[68]) {
                  vid.currentTime = vid.currentTime + 0.1;
              }
              setTimeout(keyLoop, 10)
          }
          keyLoop()
      });
    }*/
  }
}
</script>

<style>
.bv__treeanimation {
  width: 100%;
  height: 100%;
}

.bv__treeanimation > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 5;
}

.bv__treeanimation > video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 6;
}

.bv__treeanimation > video[poster] {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

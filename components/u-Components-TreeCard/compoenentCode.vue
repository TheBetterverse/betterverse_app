<template>
  <div
    class="bv__treecard"
    @click="$event.pointerType === 'touch' ? $emit('view', $event) : undefined"
  >
    <div class="bv__treecard__card">
      <div class="bv__treecard__overlay">
        <div class="bv__treecard__overlaytop">
          <div class="bv__treecard__overlaytraits">
            <!--span class="bv__treecard__trait">
              <u-Icons-Eye2 />
            </span>

            <span class="bv__treecard__trait">
              <u-Icons-Plant />
            </span>

            <span class="bv__treecard__trait">
              <u-Icons-Globe width="24px" height="24px" />
            </span-->
          </div>
        </div>

        <div class="bv__treecard__overlaybottom">
          <h4 class="bv__treecard__overlaytitle">
            <slot name="title">
              {{ localData ? localData.name : null }}
              <!-- Birget-Handroanthus #456 -->
            </slot>
          </h4>

          <h3 class="bv__treecard__overlaydescription">
            <slot name="description">
              $5,000 donated to One Tree Planted to plant 1,328 trees in
              Zimbabwe
            </slot>
          </h3>

          <div class="bv__treecard__overlayfooter">
            <u-Components-Button @click="$emit('view', $event)">
              <template #default> View </template>
              <template #right-icon>
                <u-Icons-Eye />
              </template>
            </u-Components-Button>
            <!-- <u-Components-Button>
              <template #left-icon>
                <u-Icons-Share />
              </template>
            </u-Components-Button> -->
          </div>
        </div>
      </div>

      <div class="bv__treecard__image bv__globals__skeleton">
        <!--img :src="localImage" class="bv__globals__skeleton"/-->
        <video
          v-if="localImage"
          ref="video"
          :poster="localImage"
          :src="localAnimation"
          @onmouseover="this.play()"
          @onmouseout="
            this.pause()
            this.currentTime = 0
          "
          preload
          loop
          muted
          defaultmuted
          playsinline
          class="bv__globals__skeleton"
        />
      </div>

      <div class="bv__treecard__info">
        <!--div class="bv__treecard__traits">
          span class="bv__treecard__trait">
            <u-Icons-Eye2 />
          </span>

          <span class="bv__treecard__trait">
            <u-Icons-Plant />
          </span>

          <span class="bv__treecard__trait">
            <u-Icons-Globe width="24px" height="24px" />
          </span>
        </div-->

        <h3
          class="bv__treecard__title"
          :style="{ opacity: localData ? '1' : '0' }"
        >
          {{ localData ? localData.name : '...' }}
          <!-- <slot name="title"> Birget-Handroanthus #456 </slot> -->
        </h3>
      </div>
    </div>
  </div>
</template>

<style>
.bv__treecard {
  position: relative;

  width: 300px;
  height: auto;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.bv__treecard__card {
  height: 100%;
  width: 100%;
}

.bv__treecard__image {
  aspect-ratio: 1 / 1;

  width: 100%;
  height: 100%;
  border-radius: 4px 4px 0 0;
}

.bv__treecard__image > img {
  aspect-ratio: 1 / 1;

  width: 100%;
  height: 100%;

  object-fit: fill;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid white;
}

.bv__treecard__image > video {
  aspect-ratio: 1 / 1;

  width: 100%;
  height: 100% !important;
  vertical-align: middle;
  object-fit: cover;

  border-radius: 4px 4px 0 0;
  border-bottom-style: solid;
  border-bottom-color: white;
  border-bottom-width: 1px;
}

.bv__treecard__info {
  padding: 15px 15px 10px 15px;

  background: #e8e4dd;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  border-radius: 0 0 5px 5px;
}

.bv__treecard__title {
  font-family: 'BN Cringe Sans';
  font-weight: 500;
  font-size: 24px;
  white-space: nowrap;
}

.bv__treecard__overlaytraits,
.bv__treecard__traits {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
}

.bv__treecard__overlay {
  position: absolute;
  width: 100%;
  height: 100%;

  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.bv__treecard__overlaytop {
  padding: 15px;
}

.bv__treecard__overlaybottom {
  height: 50%;
  padding: 15px;

  border-top: 1px solid white;
  background: rgba(236, 234, 227, 0.8);
  backdrop-filter: blur(4px);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 0 0 4px 4px;
}

.bv__treecard__overlaydescription {
  font-family: 'BN Cringe Sans';
  font-weight: 300;
}

.bv__treecard__overlaydescription > b {
  font-family: 'BN Cringe Sans';
  font-weight: 700;
}

.bv__treecard__overlayfooter {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bv__treecard:hover .bv__treecard__title,
.bv__treecard:hover .bv__treecard__traits,
.bv__treecard:focus .bv__treecard__traits {
  visibility: hidden;
}

.bv__treecard:hover .bv__treecard__overlay,
.bv__treecard:focus .bv__treecard__overlay {
  display: flex;
}

@media screen and (max-width: 575px) {
  .bv__treecard {
    width: auto;
    min-width: 300px;
    height: auto;
  }
}

@media screen and (min-width: 1200px) {
  .bv__treecard {
    width: auto;
    min-width: 300px;
    height: auto;
  }
}
</style>

<script>
module.exports = {
  props: {
    treejson: null,
    image: '',
    animation: '',
    name: '',
    data: null
  },

  data() {
    return {
      localName: this.name,
      localData: this.data,
      localAnimation: this.animation,
      localImage: this.image
    }
  },

  methods: {
    async getName() {
      const response = await fetch(this.treejson)
      const data = await response.json()

      this.localName = data.name
    },

    async updateComponent() {
      const response = await fetch(this.treejson)
      const data = await response.json()
      this.localData = data

      const splitImageURL = data.image.split('ipfs://').pop()
      const newImageURL = 'https://ipfs.io/ipfs/' + splitImageURL

      this.localImage = newImageURL

      const splitAnimationURL = data.animation_url.split('ipfs://').pop()
      const newAnimationURL = 'https://ipfs.io/ipfs/' + splitAnimationURL

      this.localAnimation = newAnimationURL
    }
  },

  components: {
    uIconsEye: $getCustomComponent('u-Icons-Eye'),
    uIconsEye2: $getCustomComponent('u-Icons-Eye2'),
    uIconsPlant: $getCustomComponent('u-Icons-Plant'),
    uIconsGlobe: $getCustomComponent('u-Icons-Locations'),
    uIconsShare: $getCustomComponent('u-Icons-Share'),
    uComponentsButton: $getCustomComponent('u-Components-Button')
  },

  async created() {
    await this.updateComponent()
  }

  // async updated() {
  //   await this.updateComponent()
  // }
}
</script>

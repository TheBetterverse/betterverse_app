<template>
  <div class="bv-treecard" @click="$emit('view', $event)">
    <div class="bv-treecard-hoveroverlay">
      <div class="bv-treecard-hoveroverlay-top"></div>
      <div class="bv-treecard-hoveroverlay-bottom">
        <div>
          <h2 v-if="treeName" class="bv-treecard-hoveroverlay-title">
            {{ treeName }}
          </h2>
          <h2
            v-else
            class="bv-treecard-title-skeleton bv__animations__opacitywave"
          >
            <span>.</span><span>.</span><span>.</span>
          </h2>
        </div>

        <h2 class="bv-treecard-hoveroverlay-description">
          <b> ${{ donationAmount }} </b>
          donated to
          <b>
            {{ charity }}
          </b>
          to plant
          <b> {{ numberOfTrees }} trees </b>
          in
          <b>{{ location }}</b>
        </h2>

        <div>
          <u-Components-Button @click="$emit('view', $event)">
            <p>View</p>
            <template #right-icon>
              <u-Icons-Eye></u-Icons-Eye>
            </template>
          </u-Components-Button>
        </div>
      </div>
    </div>

    <div class="bv-treecard-image bv__globals__skeleton">
      <video
        v-if="animationUrl && imageUrl"
        :poster="imageUrl"
        :src="animationUrl"
        onmouseover="this.play()"
        onmouseout="this.pause();this.currentTime=0;"
        ref="video"
        preload
        loop
        muted
        defaultmuted
        playsinline
      ></video>
    </div>

    <div class="bv-treecard-title">
      <h2 v-if="treeName">
        {{ treeName }}
      </h2>
      <h2 v-else class="bv-treecard-title-skeleton bv__animations__opacitywave">
        <span>.</span><span>.</span><span>.</span>
      </h2>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },

  components: {
    uIconsEye: $getCustomComponent('u-Icons-Eye'),
    uComponentsButton: $getCustomComponent('u-Components-Button')
  },

  data() {
    return {
      treeName: undefined,
      imageUrl: undefined,
      animationUrl: undefined,
      donationAmount: 0.0,
      numberOfTrees: 0,
      location: '',
      charity: ''
    }
  },

  async created() {
    this.donationAmount =
      this.data.$initialDonationRow.donationAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

    this.charity = this.data.$initialDonationRow.$charity$display
    this.numberOfTrees =
      this.data.$initialDonationRow.numberOfTreesPlanted.toLocaleString()

    this.location =
      this.data.$initialDonationRow.$charityProject.displayLocation

    const response = await fetch(this.data.json)
    const data = await response.json()

    this.treeName = data.name

    const splitImageURL = data.image.split('ipfs://').pop()
    const newImageURL = 'https://ipfs.io/ipfs/' + splitImageURL

    this.imageUrl = newImageURL

    const splitAnimationURL = data.animation_url.split('ipfs://').pop()
    const newAnimationURL = 'https://ipfs.io/ipfs/' + splitAnimationURL

    this.animationUrl = newAnimationURL
  }
}
</script>

<style>
.bv-treecard {
  position: relative;

  height: auto;
  width: auto;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #e8e4dd;
}

.bv-treecard-image {
  aspect-ratio: 1/1;

  width: 100%;
  height: auto;
  background: #f1ebe7;

  overflow: clip;

  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid white;
}

.bv-treecard-image > video {
  max-width: 100%;
  height: auto;

  vertical-align: middle;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.bv-treecard-title {
  display: flex;
  align-items: center;

  height: auto;
  width: 100%;
  padding: 10px 15px;
}

.bv-treecard-title > h2 {
  font-weight: 500;
  font-size: 24px;
  white-space: nowrap;
}

.bv-treecard-title-skeleton {
  color: #999;
  font-family: 'Documan', sans-serif;
}

.bv-treecard:hover .bv-treecard-hoveroverlay {
  visibility: visible;
}

.bv-treecard:hover .bv-treecard-title {
  visibility: hidden;
}

/* HOVER OVERLAY */

.bv-treecard-hoveroverlay {
  visibility: hidden;

  top: 0;
  position: absolute;

  height: 100%;
  width: 100%;
}

.bv-treecard-hoveroverlay-top {
  height: 50%;
}

.bv-treecard-hoveroverlay-bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 50%;
  padding: 15px;
  background: rgba(236, 234, 227, 0.8);
  backdrop-filter: blur(4px);
  border-top: 1px solid white;
  border-radius: 0 0 5px 5px;
}

.bv-treecard-hoveroverlay-title {
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
}

.bv-treecard-hoveroverlay-description {
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
}
</style>

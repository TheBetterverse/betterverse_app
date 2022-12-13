<template>
<div>
  <infinite-slide-bar duration="98s" >
    <div class="bv-carouselcontainer">
      <div class="bv-carousel-treecard" v-for="nft in this.nfts" :key="nft.key">
        <div class="bv-carousel-treecard-main">
          <img class="bv-carousel-profile-image" :src=getProfilePicture(nft) />
          <div class="bv-carousel-treecard-image bv__globals__skeleton">
            <u-Components-TreeImage :id="imageId" :url="nft.json">
            </u-Components-TreeImage>
          </div>
        </div>
      </div>
    </div>
  </infinite-slide-bar>
</div>
</template>

<script type="module">
module.exports = {
  props: {
    nfts: ['nfts']
  },

  components: {
    uComponentsTreeimage: $getCustomComponent('u-Components-TreeImage')
  },

  methods: {
    getProfilePicture(nft) {
      var users = $getGrid('users')
      let nftOwner = _.find(users, { user: nft.owner })

      return nftOwner.profileImage.url
    }
  },

  computed: {
    animationElement() {
      return document.getElementById(this.animationId)
    }
  },

  data() {
    return {
      imageResult: undefined,
      animationUrl: undefined,
      cardId: '',
      animationId: '',
      imageId: '',
    }
  },

  async created() {
    //console.log("Landed")
    //console.log(this.nfts)
  },
}
</script>

<style>

.bv-carouselcontainer{
  position:relative;

  display: flex; 
  justify-content: space-around;
}

.bv-carousel-treecard {
  position: relative;
  height: 150px !important;
  width: 150px !important;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #e8e4dd;   
  margin: 10px;
}

.bv-carousel-treecard-main {
  border-radius: 4px;
}

.bv-carousel-treecard-image {
  width: 100%;
  height: 100%;
  background: #f1ebe7;
  border-radius: 4px 4px 0 0;
  object-fit: cover;
  overflow: hidden;
  display: block;
}

.bv-carousel-profile-image{
  position: absolute;
  width: 28px;
  height: 28px;
  right: 0;
  margin-right: 15px;
  margin-top: 15px;
  border: 1px solid #000000;
  border-radius: 50%;
}

@media only screen and (min-width: 762px) {
  .bv-carousel-treecard {
    height: 213px !important;
    width: 213px !important;
  }
}

</style>

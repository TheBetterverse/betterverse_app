<template>
  <div>
    <div class="bv-image-selector-container">
      <div class="bv-profile-picture-wrapper">
        <!-- <img
          class="bv-profile-picture"
          src="https://i.ibb.co/nCMsC9H/hendrix-square.jpg"
        /> -->
        <icon-no-profile-picture />
      </div>
      <div v-if="editable" class="bv-image-selector-overlay-icon">
        <label
          class="bv-input-label"
          for="bv-image-input"
          style="cursor: pointer"
        >
          <input
            class="d-none"
            type="file"
            accept="image/x-png, image/jpeg"
            id="bv-image-input"
            name="bv-image-input"
            @input="console.log($event)"
          />
          <icon-camera />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },

  components: {
    IconCamera: $getCustomComponent('u-Icons-Camera'),
    IconNoProfilePicture: $getCustomComponent('u-Icons-NoProfilePicture')
  }
}
</script>

<style>
div.bv-profile-picture-wrapper {
  overflow: hidden;
  height: 80px;
  width: 80px;
  border: 1px solid black;
  border-radius: 50%;
}

img.bv-profile-picture {
  height: 80px;
  width: 80px;
  object-fit: cover;
}

div.bv-image-selector-overlay-icon {
  position: relative;
  top: -30px;
  left: 50px;
  margin-bottom: -30px;
  z-index: 9;
}
</style>

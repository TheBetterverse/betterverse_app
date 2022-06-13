<template>
  <div>
    <div class="bv-image-selector-container">
      <div class="bv-image-selector-icon">
        <icon-placeholder />
      </div>
      <div class="bv-image-selector-overlay-icon">
        <icon-camera />
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    IconCamera: $getCustomComponent('u-Icons-Camera'),
    IconPlaceholder: $getCustomComponent('u-Icons-ImageSelectorPlaceHolder')
  }
}
</script>

<style>
.bv-image-selector-overlay-icon {
  position: relative;
  top: -30px;
  left: 50px;
  z-index: 9;
}
</style>

<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="bv__tooltip" @click="$emit('click', $event)">
      <div class="bv__tooltip__title">
        <slot name="default"><u-Icons-Info /></slot>
      </div>

      <div class="bv__tooltip__container">
        <div class="bv__tooltip__tip">
          <small>
            <slot name="tooltip">
              This is the tool tip. Style it using '.bv__tooltip__tip' class.
            </slot>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: {
    uIconsInfo: $getCustomComponent('u-Icons-Info')
  }
}
</script>

<style>
.bv__tooltip {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bv__tooltip:hover {
  cursor: pointer;
}

.bv__tooltip__container {
  display: none;
  position: absolute;
  top: 1rem;
}

.bv__tooltip__tip {
  display: flex;
  position: static;
  align-items: center;
  justify-content: flex-start;

  width: 10rem;
  padding: 0.75rem 1rem;
  margin-top: 1rem;

  background: #ebe9e3;

  border: 1px solid black;
  border-radius: 5px;
  z-index: 5000;
}

.bv__tooltip:hover .bv__tooltip__container {
  display: flex;
}
</style>

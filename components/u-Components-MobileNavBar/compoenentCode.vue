<template>
  <div class="bv__comps__mobilenavbar d-lg-none">
    <slot name="default"></slot>

    <u-Components-Button
      id="bv__mobilenavbar__compassicon"
      name="Open mobile navigation"
      @click="$emit('click', $event)"
      style="background: var(--bg-primary)"
    >
      <template #left-icon>
        <u-Icons-Compass />
      </template>
    </u-Components-Button>

    <u-Components-Button
      id="bv__mobilenavbar__closeicon"
      class="hide"
      title="Close mobile navigation"
      @click="$emit('click', $event)"
      style="background: var(--bg-primary)"
    >
      <template #left-icon>
        <u-Icons-CloseX />
      </template>
    </u-Components-Button>
  </div>
</template>

<script>
module.exports = {
  components: {
    uComponentsButton: $getCustomComponent('u-Components-Button'),
    uIconsCompass: $getCustomComponent('u-Icons-Compass'),
    uIconsClosex: $getCustomComponent('u-Icons-CloseX')
  }
}
</script>

<style>
.bv__comps__mobilenavbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  position: fixed;
  bottom: 10px;

  width: 100%;
}

#bv__mobilenavbar__compassicon.hide {
  display: none;
}

#bv__mobilenavbar__closeicon.hide {
  display: none;
}
</style>

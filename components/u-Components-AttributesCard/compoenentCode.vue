<!-- u-Components-AttributesCard -->

<template>
  <div v-if="attributes" class="bv__attributes__cards">
    <div
      v-for="(attribute, key) in attributes"
      :key="key"
      class="bv__attributes__card"
    >
      <div v-html="icons[attribute['trait_type']]"></div>

      <div>
        <div
          v-for="(item, j) in attribute"
          :key="j"
          :class="'bv__attributes__card' + j"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="bv__attributes__cards" style="gap: 15px">
    <div
      v-for="(icon, key) in icons"
      style="height: 128px; border-radius: 5px"
      class="bv__attributes__card"
    >
      <div v-html="icon"></div>

      <div>
        <b>
          {{ key }}
        </b>

        <div
          class="bv__animations__opacitywave"
          style="font-family: 'Documan', sans-serif"
        >
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['url'],

  data() {
    return {
      attributes: undefined,
      icons: {}
    }
  },

  watch: {
    async url() {
      this.attributes = await this.getAttributes()
    }
  },

  methods: {
    async getAttributes() {
      if (!this.url) return undefined

      const response = await fetch(this.url)
      const json = await response.json()

      return json['attributes']
    },

    async getIconComponent(name) {
      return (await $getCustomComponent(name)())['template']
    }
  },

  async created() {
    this.icons = {
      Biome: await this.getIconComponent('u-Icons-Biome'),
      Species: await this.getIconComponent('u-Icons-Species'),
      'Foliage Palette': await this.getIconComponent('u-Icons-Foliage'),
      Fungi: await this.getIconComponent('u-Icons-Fungi'),
      'Fungi Palette': await this.getIconComponent('u-Icons-FungiPalette'),
      'Ground Palette': await this.getIconComponent('u-Icons-Ground'),
      'Trunk Palette': await this.getIconComponent('u-Icons-Trunk'),
      'Growth Phase': await this.getIconComponent('u-Icons-GrowthStage')
    }

    this.attributes = await this.getAttributes()
  }
}
</script>

<style>
.bv__attributes__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 30px;
}

.bv__attributes__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;

  width: 100%;
  height: auto;
}

.bv__attributes__cardtrait_type {
  font-weight: 700;
}

@media screen and (min-width: 768px) {
  .bv__attributes__cards {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 2000px) {
  .bv__attributes__cards {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>

<!-- u-Components-AttributesCard -->

<template>
  <div class="bv__attributes__cards">
    <div
      v-for="(attribute, key) in result"
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
</template>

<script>
module.exports = {
  props: ['url'],

  components: {
    uIconsBiome: $getCustomComponent('u-Icons-Biome')
  },

  data() {
    return {
      result: [],
      icons: {}
    }
  },

  watch: {
    url() {
      this.getAttributes()
    }
  },

  methods: {
    async getAttributes(){
      this.result = []

      if (!this.url) return

      const response = await fetch(this.url)
      const json = await response.json()

      this.result = json['attributes']
    },

    async getIconComponent(name) {
      return (await $getCustomComponent(name)())['template']
    }
  },

  async created() {

    this.icons = {
      "Biome": await this.getIconComponent('u-Icons-Biome'),
      "Species": await this.getIconComponent('u-Icons-Species'),
      "Foliage Palette": await this.getIconComponent('u-Icons-Foliage'),
      "Fungi": await this.getIconComponent('u-Icons-Fungi'),
      "Fungi Palette": await this.getIconComponent('u-Icons-FungiPalette'),
      "Ground Palette": await this.getIconComponent('u-Icons-Ground'),
      "Trunk Palette": await this.getIconComponent('u-Icons-Trunk'),
      "Growth Phase": await this.getIconComponent('u-Icons-GrowthStage')
    }

    await this.getAttributes()
  },
}
</script>

<style>
.bv__attributes__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}

.bv__attributes__card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;

  width: 100%;
  height: 92px;

  margin: 15px 0;
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

<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
module.exports = {
  props: ['url', 'prop'],
  data() {
    return {
      result: null
    }
  },
  methods: {
    async getProp(url) {
      const response = await fetch(url);

      const json = await response.json()
      
      this.result = await json[this.prop]
    }
  },
  async created() {
    if (this.url) this.getProp(this.url)
  }
}
</script>

<!-- u-Components-ProjectCard -->

<template>
  <div class="bv__comps__projectcard">
    <div class="bv__comps__projectimage bv__globals__skeleton">
      <img
        :src="project.projectImage.url"
        :title="`${project.$cause$display} in ${project.displayLocation}`"
      />
    </div>

    <div class="bv__comps__projectdescription">
      <div class="bv__comps__projecttitle">
        <div class="bv__comps__projectcharity">
          <img :src="project.$charity.charityLogo.url" />

          <p>
            {{ project.$charity.charityName }}
          </p>
        </div>

        <h2>{{ formattedProjectName }}</h2>
      </div>

      <div class="bv__comps__projectinfo">
        <div class="bv__comps__projectinfocard">
          <p>Cause</p>
          <p>{{ project.$cause$display }}</p>
        </div>
        <div class="bv__comps__projectinfocard">
          <p>Location</p>
          <p>{{ project.displayLocation }}</p>
        </div>
        <div class="bv__comps__projectinfocard">
          <p>Price / tree</p>
          <p style="display: flex; gap: 0.25rem">
            <u-Icons-Usdc> </u-Icons-Usdc>
            {{ project.pricePerTree.toFixed(2) }}
          </p>
        </div>
      </div>

      <div class="bv__comps__projectactions">
        <u-Components-Button
          title="View project"
          class="bv__comps__projectactionsview"
          @click="$emit('view', project)"
        >
          <p>View</p>
          <template #right-icon>
            <u-Icons-Eye
              color="black"
              class="bv__comps__projectactionsviewicon"
            ></u-Icons-Eye>
          </template>
        </u-Components-Button>
        <u-Components-Button
          @click="$emit('donate', project)"
          title="Donate to project"
        >
          <p>Give</p>
          <template #right-icon>
            <u-Icons-Heart color="black" />
          </template>
        </u-Components-Button>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    project: {
      type: Object,
      default(data) {
        return { ...data }
      }
    }
  },

  computed: {
    formattedProjectName() {
      let name = this.project.projectName
      if (name.length > 24) {
        name = name.substr(0, 22) + '...'
      }
      return name
    }
  },

  components: {
    uComponentsButton: $getCustomComponent('u-Components-Button'),
    uIconsEye: $getCustomComponent('u-Icons-Eye'),
    uIconsHeart: $getCustomComponent('u-Icons-Heart'),
    uIconsUsdc: $getCustomComponent('u-Icons-USDC')
  }
}
</script>

<style>
.bv__comps__projectcard {
  height: auto;
  min-width: max-content;
  width: 100%;
  max-width: 100%;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  scroll-snap-align: start;
}

.bv__comps__projectimage {
  height: 45%;
  max-height: 180px;
  border-radius: 4px 4px 0 0;
  width: 100%;
  aspect-ratio: 1/2;
}

.bv__comps__projectimage > img {
  height: 100%;
  max-height: 180px;
  width: 100%;
  aspect-ratio: 1/2;

  object-fit: cover;
  object-position: 50% 50%;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid white;
}

.bv__comps__projectdescription {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  height: 55%;
  padding: 1.25rem;
  width: 100%;
}

.bv__comps__projecttitle {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.bv__comps__projectcharity {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.bv__comps__projectcharity > img {
  max-height: 1.25rem;
}

.bv__comps__projectcharity > p {
  font-family: 'BN Cringe Sans', sans-serif;
  font-weight: 400;
}

.bv__comps__projectinfo {
  display: flex;
  justify-content: start;
  width: 100%;

  gap: 2rem;
}

.bv__comps__projectinfocard > p:last-child {
  font-family: 'BN Cringe Sans';
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px;
  line-height: 20px;
}

.bv__comps__projectactions {
  display: flex;
  gap: 10px;
}

.bv__comps__projectactions > .bv__comps__projectactionsview:hover,
.bv__comps__projectactions > .bv__comps__projectactionsview:focus {
  border: 1px solid white;
  background: black;
  color: white;
}

.bv__comps__projectactions
  > .bv__comps__projectactionsview:hover
  .bv__comps__projectactionsviewicon
  > svg
  > * {
  stroke: white;
}
</style>

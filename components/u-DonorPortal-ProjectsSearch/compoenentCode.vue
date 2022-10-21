<!-- u-DonorPortal-ProjectsSearch -->

<template>
  <div id="bv__projects">
    <div id="bv__projects__nav">
      <h1>Projects</h1>

      <div id="bv__projects__navfilters">
        <div id="bv__projects__navinputwrapper">
          <u-Icons-Search></u-Icons-Search>

          <input
            name="search-input"
            id="bv__projects__navinput"
            type="text"
            placeholder="Search projects"
            autocomplete="none"
            @input="onSearchInput"
          />
        </div>

        <div id="bv__projects__sorts">
          <u-Icons-Popular
            v-if="currentSort === 'most-popular'"
          ></u-Icons-Popular>
          <u-Icons-Recent v-if="currentSort === 'most-recent'"></u-Icons-Recent>
          <u-Icons-High v-if="currentSort === 'highest-price'"></u-Icons-High>
          <u-Icons-Low v-if="currentSort === 'lowest-price'"></u-Icons-Low>

          <select
            name="filter-input"
            id="bv__projects__sortsselect"
            @change="onSelectChange"
          >
            <option value="most-popular" selected>
              <p>Most popular</p>
            </option>
            <option value="most-recent">
              <p>Most recent</p>
            </option>
            <option value="highest-price">
              <p>Price (high to low)</p>
            </option>
            <option value="lowest-price">
              <p>Price (low to high)</p>
            </option>
          </select>
        </div>
      </div>
    </div>

    <div id="bv__projects__list">
      <u-Components-ProjectCard
        v-for="(project, key) in filteredData"
        :key="key"
        :project="project"
        @view="$emit('view', $event)"
        @donate="$emit('donate', $event)"
      />
    </div>
  </div>
</template>

<script>
let capturedDonationDataCache = undefined

function getCapturedDonationData() {
  if (capturedDonationDataCache === undefined)
    capturedDonationDataCache = $getGrid('capturedDonationData')

  return capturedDonationDataCache
}

function throttleInput(cb, delay = 640) {
  let waiting = false
  let waiting_args

  function timeout() {
    waiting = false

    if (waiting_args === undefined) return

    cb(...waiting_args)

    waiting_args = undefined
  }

  return (...args) => {
    if (waiting) {
      waiting_args = args
      return
    }

    waiting = true
    waiting_args = undefined

    setTimeout(timeout, delay)

    cb(...args)

    return
  }
}

function filterData(needle, data) {
  const lower = needle.toLowerCase()
  return data.filter(current => {
    return (
      current.projectName.toLowerCase().includes(lower) ||
      current.cause.toLowerCase().includes(lower) ||
      current.$charity$display.toLowerCase().includes(lower) ||
      current.displayLocation.toLowerCase().includes(lower)
    )
  })
}

const sortingMethods = {
  'most-recent': (a, b) => {
    let dateA = new Date(a.$createdDate$Date)
    let dateB = new Date(b.$createdDate$Date)

    return dateA - dateB
  },

  'most-popular': (a, b) => {
    let capturedDonation = getCapturedDonationData()

    let amountA = capturedDonation
      .filter(row => row.charityProject === a.rowKey)
      .reduce((total, current) => {
        total += current.donationAmount
        return total
      }, 0)

    let amountB = capturedDonation
      .filter(row => row.charityProject === b.rowKey)
      .reduce((total, current) => {
        total += current.donationAmount
        return total
      }, 0)

    return amountB - amountA
  },

  'highest-price': (a, b) => {
    let priceA = a.pricePerTree
    let priceB = b.pricePerTree

    return priceB - priceA
  },

  'lowest-price': (a, b) => {
    let priceA = a.pricePerTree
    let priceB = b.pricePerTree

    return priceA - priceB
  }
}

module.exports = {
  props: {
    id: 'bv-projects-filteredsearch',
    data: {
      default: () => []
    }
  },

  components: {
    uIconsSearch: $getCustomComponent('u-Icons-Search'),
    uIconsChevron: $getCustomComponent('u-Icons-Chevron'),
    uIconsPlaceholder: $getCustomComponent('u-Icons-Placeholder'),
    uIconsUsdc: $getCustomComponent('u-Icons-USDC'),
    uIconsHeart: $getCustomComponent('u-Icons-Heart'),
    uIconsEye: $getCustomComponent('u-Icons-Eye'),
    uComponentsButton: $getCustomComponent('u-Components-Button'),
    uComponentsDropdown: $getCustomComponent('u-Components-NavbarDropDown'),
    uComponentsProjectcard: $getCustomComponent('u-Components-ProjectCard'),
    uIconsPopular: $getCustomComponent('u-Icons-Popular'),
    uIconsRecent: $getCustomComponent('u-Icons-Recent'),
    uIconsHigh: $getCustomComponent('u-Icons-High-to-low'),
    uIconsLow: $getCustomComponent('u-Icons-Low-to-high')
  },

  methods: {
    onSearchInput(event) {
      this.currentNeedle = event.target.value
      this.updateData()
    },

    onSelectChange(event) {
      this.currentSort = event.target.value
      this.updateData()
    },

    updateData() {
      this.filteredData = filterData(this.currentNeedle, this.data)
      this.filteredData.sort(sortingMethods[this.currentSort])
    }
  },

  data() {
    return {
      currentNeedle: '',
      currentSort: 'most-popular',
      filteredData: this.data
    }
  },

  created() {
    this.onSearchInput = throttleInput(this.onSearchInput)
    this.updateData()
  }
}
</script>

<style>
#bv__projects {
  padding-top: 45px;
  padding-bottom: 15px;

  /* border-top: 1px solid rgba(0, 0, 0, 0.05); */
}

#bv__projects__nav {
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  gap: 1rem;
  padding-top: 15px;
  padding-bottom: 20px;
}

#bv__projects__navfilters {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

#bv__projects__navinputwrapper {
  display: flex;
  gap: 0.3rem;

  height: 32px;
  width: 100%;

  border: 1px solid black;
  border-radius: 16px;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

#bv__projects__navinput {
  border: none;
  background: none;
  width: 100%;
}

#bv__projects__navinput:active,
#bv__projects__navinput:focus {
  border: none;
  outline: none;
}

#bv__projects__sorts {
  display: flex;
  align-items: center;

  width: 100%;
  height: 32px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  border: 1px solid black;
  border-radius: 16px;
}

#bv__projects__sorts > * {
  display: flex;
  align-items: center;
}

#bv__projects__sortsselect {
  outline: none;
  color: black !important;

  height: 100%;
  width: 100%;

  border: none;
  background: none;
  display: flex;
  align-items: center;

  border-radius: 5px;
}

#bv__projects__sortsselect:active,
#bv__projects__sortsselect:focus {
  outline: none;
  border: none !important;
}

#bv__projects__list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media screen and (min-width: 660px) {
  #bv__projects__list {
    grid-template-columns: repeat(2, 1fr);
  }

  #bv__projects__nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  #bv__projects__navfilters {
    display: grid;
    width: auto;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
}

@media screen and (min-width: 1080px) {
  #bv__projects__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1440px) {
  #bv__projects__list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1800px) {
  #bv__projects__list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (min-width: 1800px) {
  #bv__projects__list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (min-width: 2096px) {
  #bv__projects__list {
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>

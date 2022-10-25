<!-- Donor Portal Personal Info Form -->

<template>
  <div class="w-100" style="margin-top: 44px">
    <!-- For small displays -->
    <header class="d-flex d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-1 d-flex">
        <b-col class="d-flex align-items-center md-logo">
          <icon-betterverse width="32" heigth="32" />
        </b-col>
      </b-row>
    </header>

    <section name="title" class="mb-5">
      <b-container>
        <b-row class="my-3">
          <p>Create Account <b>> Personal Info</b></p>
        </b-row>
        <b-row>
          <slot>
            <h1>
              Tell us a bit <br />
              <b>about you</b>
            </h1>
            <h2>
              Give us as much info as you like, no pressure to tell us anything
              more than your username.
            </h2>
          </slot>
        </b-row>
      </b-container>
    </section>

    <form @submit.prevent="handleSubmit">
      <section name="form-inputs">
        <bv-profile-picture
          editable
          v-model="form.profilepic"
        ></bv-profile-picture>

        <div class="my-3">
          <bv-input
            id="username-input"
            label="Username*"
            name="username-input"
            type="text"
            placeholder="Create a username"
            required
            v-model="form.username"
            :disabled="$getGlobalModel('signUpProcess')"
            :validators="validators.username"
          >
          </bv-input>

          <b-container>
            <b-row>
              <b-col class="pr-4">
                <bv-input
                  label="First name"
                  name="fname-input"
                  type="text"
                  placeholder="Your first name"
                  v-model="form.fname"
                  :validators="validators.name"
                />
              </b-col>
              <b-col>
                <bv-input
                  label="Last name"
                  name="lname-input"
                  type="text"
                  placeholder="Your last name"
                  v-model="form.lname"
                  :validators="validators.name"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pr-4">
                <bv-input
                  label="Phone number"
                  name="phone-input"
                  type="number"
                  placeholder="Your number"
                  v-model="form.phone"
                  :disabled="$getGlobalModel('signUpProcess')"
                  :validators="validators.phone"
                  ><icon-plus />
                </bv-input>
              </b-col>
              <b-col>
                <bv-dropdown
                  label="Country"
                  name="country-input"
                  placeholder="Select country"
                  v-model="form.country"
                  :items="getAllCountries()"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col class="pr-4">
                <bv-dropdown
                  label="Conversion currency"
                  name="currency-input"
                  placeholder="Select currency"
                  v-model="form.currency"
                  :items="getAllComparisonCurrencies()"
                />
              </b-col>
              <b-col> </b-col>
            </b-row>
          </b-container>

          <div class="d-flex align-items-center justify-content-between my-4">
            <small>*Mandatory fields</small>
            <div>
              <bv-button
                secondary
                type="submit"
                name="continue-button"
                title="Continue registration"
              >
                <template id="bv__continue__button__contents">
                  <p>Continue</p>
                </template>
                <template #right-icon>
                  <icon-arrow
                    right
                    v-if="spinnerActive == false"
                    color="white"
                  ></icon-arrow>
                  <div
                    v-if="spinnerActive == true"
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                </template>
              </bv-button>
            </div>
          </div>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
const BAD_WORDS = window.invalidWordsThatCannotBeUsedInThisApplication

async function hasValidCharacters(subject) {
  const invalidCharacters = /^[a-zA-Z\-\.\_0-9]+$/

  return invalidCharacters.test(subject)
}

async function noBadWords(subject) {
  let lower = subject.toLowerCase()
  return !BAD_WORDS.some(v => lower.includes(v))
}

async function validNames(subject) {
  const invalidCharacters =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/u
  return invalidCharacters.test(subject)
}

async function includeCharacters(subject) {
  const characters = /(.*[a-z]){3}/i

  return characters.test(subject)
}

function validLength(subject) {
  return subject.length >= 4
}

async function usernameDontExist(subject) {
  const users = await $getGrid('users').filter(row => row.user != fbUser.uid)

  for (i = 0; i < users.length; i++) {
    if (users[i].username == subject) {
      return false
    }
  }

  return true
}

async function phoneIsRightFormat(subject) {
  if (subject.length < 1) return true
  return /^[0-9]+$/.test(subject)
}

function notEmptyString(subject) {
  return subject !== ''
}

// ---

module.exports = {
  data() {
    return {
      spinnerActive: false,
      form: {
        profilepic: {},
        username: {},
        fname: {},
        lname: {},
        phone: {},
        country: {},
        currency: {}
      },
      validators: {
        username: {
          'Username is required': notEmptyString,
          'Username already exists': usernameDontExist,
          'Username cannot contain profanity!': noBadWords,
          'Invalid characters': hasValidCharacters,
          'Username must contain atleast 4 characters': validLength,
          'Username must contain atleast 3 letters': includeCharacters
        },

        name: {
          'Input cannot contain profanity!': noBadWords,
          'Invalid characters': validNames
        },

        phone: {
          'Phone is invalid': phoneIsRightFormat
        }
      }
    }
  },

  methods: {
    async handleSubmit(e) {
      this.showErrors()
      if (!this.inputsAreValid) return
      this.spinnerActive = true

      await new Promise(r => setTimeout(r, 2000))
      this.$emit('submit', this.formContent)
    },

    async showErrors() {
      Object.values(this.form).forEach(field => {
        if (field.required || field.content !== '') field.active = true
      })
    },

    async getCurrentUserProfile() {
      const users = $getGrid('users')
      let currentUser = _.find(users, { user: fbUser.uid })
      return currentUser
    },

    getAllCountries() {
      return $getGrid('locations').map(value => value.name)
    },

    getAllComparisonCurrencies() {
      return $getGrid('conversionCurrencies').map(value => value.currency)
    }
  },

  computed: {
    inputsAreValid() {
      return Object.values(this.form).every(field => field.valid)
    },

    formContent() {
      return Object.entries(this.form).reduce((prev, curr) => {
        prev[curr[0]] = curr[1].content
        return prev
      }, {})
    }
  },

  components: {
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconPlus: $getCustomComponent('u-Icons-Plus'),
    IconArrow: $getCustomComponent('u-Icons-Arrow'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    BvProfilePicture: $getCustomComponent('u-Components-ProfilePicture'),
    BvDropdown: $getCustomComponent('u-Components-DropDown'),
    BvButton: $getCustomComponent('u-Components-Button'),
    BvInput: $getCustomComponent('u-Components-Input')
  },

  async created() {

    const currentProvider = fbUser.providerData[0].providerId

    if(currentProvider === 'oidc.unstoppable.domains'){
      const domain = fbUser.providerData[0].uid
      setTimeout(() => {
        let UsernameInputEl = document.getElementById('username-input') 
        console.log(UsernameInputEl)
        UsernameInputEl.value = domain
        UsernameInputEl.dispatchEvent(new Event('input'))
      }, 1000)
    }
  }
}
</script>

<style>
.container,
.row,
.col {
  padding: 0;
  margin: 0;
}

div.status-bar-clearance {
  height: 44px;
}

input[name='phone-input'] {
  appearance: none;
}

input[name='phone-input']::-webkit-outer-spin-button,
input[name='phone-input']::-webkit-inner-spin-button {
  /* -webkit-appearance: none; */
  appearance: none;
  margin: 0;
}
</style>

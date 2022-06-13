<!-- Donor Portal Personal Info Form -->

<template>
  <div class="w-100">
    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5 d-flex">
        <b-col class="d-flex align-items-center md-logo">
          <icon-betterverse width="32" heigth="32" />
        </b-col>

        <b-col class="text-right d-flex justify-content-end">
          <small>Have an account?<br /><a href="#">Log in</a></small>
        </b-col>
      </b-row>
    </b-container>

    <!-- Main Header -->
    <div class="my-2">Create Account <b>> Personal Info</b></div>
    <div class="my-3 mb-4">
      <slot>
        <h1>A few things about <b>yourself</b></h1>
        <p>
          Here will say something about this and how it must be extraordinay.
        </p>
      </slot>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <!-- Image Selector -->
      <bv-profile-picture editable></bv-profile-picture>

      <div class="my-3">
        <!-- Username Input -->
        <bv-input
          label="Username*"
          name="username-input"
          type="text"
          placeholder="Create a username"
          v-model="form.username"
          :disabled="$getGlobalModel('signUpProcess')"
          :validators="validators.username"
          @input="handleInput"
        >
        </bv-input>

        <b-container>
          <b-row>
            <b-col class="pr-4">
              <!-- First Name Input -->
              <bv-input
                label="First name"
                name="fname-input"
                type="text"
                placeholder="Your first name"
                v-model="form.fname"
                :validators="validators.name"
                :disabled="$getGlobalModel('signUpProcess')"
              />
            </b-col>
            <b-col>
              <!-- Last Name Input -->
              <bv-input
                label="Last name"
                name="lname-input"
                type="text"
                placeholder="Your last name"
                v-model="form.lname"
                :validators="validators.name"
                :disabled="$getGlobalModel('signUpProcess')"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col class="pr-4">
              <!-- Phone Input -->
              <bv-input
                label="Phone number"
                name="phone-input"
                type="text"
                placeholder="Your number"
                v-model="form.phone"
                :disabled="$getGlobalModel('signUpProcess')"
                :validators="validators.phone"
                ><icon-plus />
              </bv-input>
            </b-col>
            <b-col>
              <!-- Country Input -->
              <bv-dropdown
                required
                label="Country"
                name="country-input"
                placeholder="Select country"
                v-model="form.country"
                :items="['United Kingdom', 'Brasil']"
                :disabled="$getGlobalModel('signUpProcess')"
              />
            </b-col>
          </b-row>
          <b-row>
            <!-- Conversion Input -->
            <b-col class="pr-4">
              <bv-dropdown
                label="Conversion currency"
                name="currency-input"
                v-model="form.currency"
                :items="['GBP', 'BRL']"
                :disabled="$getGlobalModel('signUpProcess')"
              />
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-container>

        <!-- Continue button -->
        <div class="d-flex align-items-center justify-content-between my-4">
          <small>*Mandatory fields</small>
          <button-continue
            action="submit"
            name="continue-button"
            :disabled="$getGlobalModel('signUpProcess')"
            >Continue
          </button-continue>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
async function usernameIsRightFormat(subject) {
  /* needs implementation */
  return true
}

async function usernameDontExist(subject) {
  /* needs implementation */
  return true
}

async function phoneIsRightFormat(subject) {
  return /^[0-9]+$/.test(subject)
}

function notEmptyString(subject) {
  return subject !== ''
}

// ---

module.exports = {
  data() {
    return {
      form: {
        username: {},
        fname: {},
        lname: {},
        phone: {},
        country: {},
        currency: {}
      },
      validators: {
        username: {
          "Field can't be empty": notEmptyString,
          'Username is already registered': usernameDontExist,
          'Email format is invalid': usernameIsRightFormat
        },
        name: {
          "Field can't be empty": notEmptyString
        },
        phone: {
          "Field can't be empty": notEmptyString,
          'Phone is invalid': phoneIsRightFormat
        }
      }
    }
  },

  methods: {
    async handleSubmit(e) {
      this.showErrors()

      if (!this.inputsAreValid) {
        console.error('> INPUTS ARE INVALID')
        return
      }

      console.log('> INPUTS ARE VALID')
    },

    async handleInput(e) {},

    /* View */
    async showErrors() {
      Object.values(this.form).forEach(field => (field.active = true))
    }
  },

  computed: {
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
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    IconPlus: $getCustomComponent('u-Icons-Plus'),
    ButtonContinue: $getCustomComponent('u-Buttons-LeftArrow'),
    BvProfilePicture: $getCustomComponent('u-Components-ProfilePicture'),
    BvDropdown: $getCustomComponent('u-Components-DropDown'),
    BvInput: $getCustomComponent('u-Components-Input'),
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
</style>

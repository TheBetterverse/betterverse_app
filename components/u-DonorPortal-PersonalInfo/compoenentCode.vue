<!-- Donor Portal Sign Up Form -->

<template>
  <div class="w-100">
    <!-- Header for small displays -->
    <b-container class="d-block d-lg-none w-100">
      <b-row class="status-bar-clearance"></b-row>

      <b-row class="mt-1 mb-5 d-flex">
        <b-col class="d-flex align-items-center">
          <icon-betterverse class="md-logo" />
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
      <bv-image-selector></bv-image-selector>

      <!-- Email Input -->
      <bv-input
        label="Username*"
        name="username-input"
        type="text"
        placeholder="Create a username"
        v-model="username"
        :disabled="$getGlobalModel('signUpProcess')"
      >
      </bv-input>

      <!-- Password Input -->
      <b-container>
        <b-row>
          <b-col class="pr-4">
            <bv-input
              label="First name"
              name="fname-input"
              type="text"
              placeholder="Your name"
              v-model="fname"
              :disabled="$getGlobalModel('signUpProcess')"
            />
          </b-col>
          <b-col>
            <bv-input
              label="Last name"
              name="lname-input"
              type="text"
              placeholder="Your last name"
              v-model="lname"
              :disabled="$getGlobalModel('signUpProcess')"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="pr-4">
            <bv-input
              label="Phone number"
              name="fname-input"
              type="text"
              placeholder="Your number"
              v-model="fname"
              :disabled="$getGlobalModel('signUpProcess')"
            />
          </b-col>
          <b-col>
            <bv-input
              label="Last name"
              name="lname-input"
              type="text"
              placeholder="Your last name"
              v-model="lname"
              :disabled="$getGlobalModel('signUpProcess')"
            />
          </b-col>
        </b-row>
      </b-container>

      <!-- Continue button -->
      <div class="button-wrapper d-flex justify-content-end">
        <b-spinner v-if="$getGlobalModel('signUpProcess')" small></b-spinner>

        <button
          v-else
          class="continue-button"
          name="continue-button"
          :disabled="$getGlobalModel('signUpProcess')"
        >
          <span class="continue-arrow">
            <icon-leftarrow />
          </span>
        </button>
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
  /* needs implementation */
  return true
}

function hasMinLength(length) {
  return async function (subject) {
    return subject.length >= length
  }
}

function notEmptyString(subject) {
  return subject !== ''
}

// ---

module.exports = {
  data() {
    return {
      username: {},
      fname: {},
      lname: {},
      phone: {},
      country: {},
      currency: {},
      usernameValidators: {
        "Field can't be empty": notEmptyString,
        'Username is already registered': usernameDontExist,
        'Email format is invalid': usernameIsRightFormat
      },
      nameValidators: {
        "Field can't be empty": notEmptyString
      },
      phoneValidators: {
        'Phone format is invalid': phoneIsRightFormat
      }
    }
  },

  methods: {
    /* Events */
    async handleSubmit(e) {
      console.log(e)
    }
  },

  components: {
    BvInput: $getCustomComponent('u-Components-Input'),
    BvImageSelector: $getCustomComponent('u-Components-ImageSelector'),
    IconLock: $getCustomComponent('u-Icons-Lock'),
    IconMail: $getCustomComponent('u-Icons-Mail'),
    IconLeftarrow: $getCustomComponent('u-Icons-Leftarrow'),
    IconBetterverse: $getCustomComponent('u-Icons-Betterverse'),
    ButtonSignup: $getCustomComponent('u-Button-SignUp')
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

.status-bar-clearance {
  height: 44px;
}

.md-logo {
  height: 32px;
  width: 32px;
}

.continue-arrow {
  height: 20px;
  width: 20px;
}

.continue-button {
  color: white;
  background: black;
  height: 32px;
  width: 32px;
  border: 1px solid #000000;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

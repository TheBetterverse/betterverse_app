/* DonorPortal_SubmitProfileUpdate.js */

const SAVE_CHANGES_DELAY = 6_000
const CLEAR_INPUT_DELAY = 250

let clearInputTimeouts = {}
let saveChangesTimeout = undefined

function clearAndUpdateInput(name, placeholder, value = '') {
  let element = document.getElementsByName(name)[0]
  element.placeholder = placeholder

  setTimeout(() => (element.value = value), CLEAR_INPUT_DELAY)

  if (name in clearInputTimeouts) clearInterval(clearInputTimeouts[name])

  clearInputTimeouts[name] = setTimeout(() => {
    element.dispatchEvent(new Event('input'))
    delete clearInputTimeouts[name]
  }, SAVE_CHANGES_DELAY - 640)
}

return event => {
  let errors = $(event.target).find('.bv__input__error')

  if (errors.length > 0) {
    console.log('Invalid inputs:')
    errors.each((_, value) => console.log(value.textContent.trim()))
    return
  }

  let form = Object.values(event.target).reduce((result, current) => {
    if (current.name && current.value)
      result = { ...result, [current.name]: current.value }
    return result
  }, {})

  let currentUserRowKey = this.DonorPortal_GetCurrentUserRowKey()
  let anyChanges = false

  if (form) {
    if (form.profilePicture) {
      let content = document.getElementById('bv__settings__profilepicinput')
        .files[0]
      anyChanges = true
      this.DonorPortal_UploadProfilePicture(content)
    }

    if (form.username) {
      //If username already exists
      if (
        this.DonorPortal_CheckIfUsernameExists(
          form.username,
          currentUserRowKey
        ) == true
      ) {
        console.log('Error: username exists already')
      } else {
        $setDataGridVal('users', currentUserRowKey + '.username', form.username)
        anyChanges = true
      }

      clearAndUpdateInput('username', this.DonorPortal_GetCurrentUserNames())
    }

    //First name
    if (form.firstName) {
      $setDataGridVal('users', currentUserRowKey + '.firstName', form.firstName)

      anyChanges = true
      clearAndUpdateInput(
        'firstName',
        this.DonorPortal_GetCurrentUserNames('first')
      )
    }

    //Last name
    if (form.lastName) {
      $setDataGridVal('users', currentUserRowKey + '.lastName', form.lastName)

      anyChanges = true
      clearAndUpdateInput(
        'lastName',
        this.DonorPortal_GetCurrentUserNames('last')
      )
    }

    //Phone number
    if (form.phoneNumber) {
      $setDataGridVal(
        'users',
        currentUserRowKey + '.phonenumber',
        form.phoneNumber
      )

      anyChanges = true
      clearAndUpdateInput(
        'phoneNumber',
        this.DonorPortal_GetCurrentUserPhoneNumber()
      )
    }

    //Location
    if (
      form.location &&
      form.location != this.DonorPortal_GetCurrentUserProfileLocation()
    ) {
      $setDataGridVal('users', currentUserRowKey + '.location', form.location)

      anyChanges = true
      clearAndUpdateInput('location', form.location, form.location)
    }

    //Comparison Currency
    if (
      form.comparisonCurrency &&
      form.comparisonCurrency !=
        this.DonorPortal_GetCurrentUserComparisonCurrency()
    ) {
      //Find currency row
      var currencies = $getGrid('conversionCurrencies')
      for (i = 0; i < currencies.length; i++) {
        if (currencies[i].currency == form.comparisonCurrency) {
          var selectedCurrencyRowKey = currencies[i].rowKey
        }
      }

      if (selectedCurrencyRowKey) {
        $setDataGridVal(
          'users',
          currentUserRowKey + '.comparisonCurrency',
          selectedCurrencyRowKey
        )
        anyChanges = true
      }

      clearAndUpdateInput(
        'comparisonCurrency',
        form.comparisonCurrency,
        form.comparisonCurrency
      )
    }

    if (anyChanges) {
      let updateText = $('.bv__settings__updatetxt')

      updateText.each((_, el) => el.classList.remove('hidden'))
      $('.bv__settings__savechangesbtn').each((_, el) => (el.disabled = true))

      if (saveChangesTimeout) clearInterval(saveChangesTimeout)

      saveChangesTimeout = setTimeout(
        () => updateText.each((_, el) => el.classList.add('hidden')),
        SAVE_CHANGES_DELAY
      )
    }
  }
}

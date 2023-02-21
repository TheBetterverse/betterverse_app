/* DonorPortal_SubmitPersonalInfo.js */

return async form => {

  console.log('Edit Row - DonorPortal_SubmitPersonalInfo.js')

  let currentUserRowKey = this.DonorPortal_GetCurrentUserRowKey()

  let { profilepic, username, fname, lname, phone, country, currency } = form

  if (profilepic) this.DonorPortal_UploadProfilePicture(profilepic, currentUserRowKey)
  
  $setDataGridVal('users', currentUserRowKey + '.username', username)
  if (fname) $setDataGridVal('users', currentUserRowKey + '.firstName', fname)
  if (lname) $setDataGridVal('users', currentUserRowKey + '.lastName', lname)
  if (phone) $setDataGridVal('users', currentUserRowKey + '.phonenumber', phone)
  if (country) $setDataGridVal('users', currentUserRowKey + '.location', country)

  let countryRowKey
  //Get location rowKey
  if (country) {
    let countryRow = $getGrid('locations').filter(row => row.name === country)
    $setDataGridVal('users', currentUserRowKey + '.location', country[0].rowKey)
    countryRowkey = country[0].rowKey
  }
  
  let currencyRowKey
  //Get currency rowKey
  if (currency) {
    let currencyRow = $getGrid('conversionCurrencies').filter(row => row.currency === currency)
    $setDataGridVal('users', currentUserRowKey + '.comparisonCurrency', currencyRow[0].rowKey)
    currencyRowKey = currencyRow[0].rowKey
  }

  /*await this.callWf({
      workflow: '-NC_Xgc-ygK2y5hGsrp-',
      payload: {
          userRowKey: currentUserRowKey,
          username: username,
          firstName: fname,
          secondName: lname,
      },
  })*/

  $setUser('ProfileSetUpStage', 2)
  $setCurrentSubTab('-N4UIKK5MmraPqo_BhCH', '-Mx_5FLL2jlxjXYUMdIL')
}

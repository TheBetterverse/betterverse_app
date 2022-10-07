/* DonorPortal_GetCurrentUserDailyCarbonSequestrationUpdate.js */

return function (choice) {
  const oneDay = 24 * 60 * 60 * 1000
  var currentDateTime = this.DonorPortal_GetDateTime()

  if (choice == 'all') {
    var donationRows = this.DonorPortal_GetCurrentUserDonationRows()

    var donationDateCarbonSequestrationToDate = []

    //Loop through all donation rows
    for (i = 0; i < donationRows.length; i++) {
      //Get yearly carbon sequestration value and work out daily value from donation row
      let yearlyCarbonSequestration = donationRows[i].yearlyCarbonSequestration
      let dailyCarbonSequestration = yearlyCarbonSequestration / 365

      //Get donation date and work out how many days from donation date to today
      let donationDate = donationRows[i].donationDate
      let differenceInDays = Math.round(
        Math.abs((currentDateTime - donationDate) / oneDay)
      )

      //If donation was made today
      if (differenceInDays == 0) {
        donationDateCarbonSequestrationToDate[i] = dailyCarbonSequestration
      }

      //If donation was not made today
      else {
        let donationRowCarbonSequestrationToDate =
          dailyCarbonSequestration * differenceInDays
        donationDateCarbonSequestrationToDate[i] =
          donationRowCarbonSequestrationToDate
      }
    }

    var arraySum = 0

    for (x = 0; x < donationDateCarbonSequestrationToDate.length; x++) {
      arraySum += donationDateCarbonSequestrationToDate[x]
    }

    return arraySum.toFixed(2)
  } else if (choice == 'specific') {
    var dailyCarbonSequestrationUpdate = 0

    var donationRow = this.DonorPortal_GetSpecificDonation()

    let yearlyCarbonSequestration = donationRow.yearlyCarbonSequestration
    let dailyCarbonSequestration = yearlyCarbonSequestration / 365

    let donationDate = donationRow.donationDate
    let differenceInDays = Math.round(
      Math.abs((currentDateTime - donationDate) / oneDay)
    )

    if (differenceInDays == 0) {
      dailyCarbonSequestrationUpdate = dailyCarbonSequestration
    } else {
      dailyCarbonSequestrationUpdate =
        dailyCarbonSequestration * differenceInDays
    }

    return dailyCarbonSequestrationUpdate
  } else {
    console.error(
      'DonorPortal_GetCurrentUserDailyCarbonSequestrationUpdate: invalid/null donation number parameter'
    )
    return null
  }
}

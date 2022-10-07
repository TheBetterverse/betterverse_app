/* DonorPortal_GetCurrentUserTotalDonationsAmount.js */

return function (currency) {
  if (currency === undefined) currency = '$'

  //default
  let currentUser = fbUser.uid
  let amountUSD = $getGrid('capturedDonationData')
    .filter(row => row.user == currentUser)
    .reduce((total, curr) => total + curr.donationAmount, 0)

  let amountGBP = $getGrid('capturedDonationData')
    .filter(row => row.user == currentUser)
    .reduce((total, curr) => total + curr.donationAmountGBP, 0)
  
  let amountEUR = $getGrid('capturedDonationData')
  .filter(row => row.user == currentUser)
  .reduce((total, curr) => total + curr.donationAmountEUR, 0)
  


  switch (currency) {
    case '$':
      return amountUSD.toFixed(2)
      break;
    case '£':
      return amountGBP.toFixed(2)
      break;
    case '€':
      return amountEUR.toFixed(2)
      break;
  }

  // if (currency == '$') {
  //   for (let i = 0; i < myDonationRows.length; i++) {
  //     amount = +amount + +myDonationRows[i].donationAmount
  //   }

  //   if (amount > 0) {
  //     return amount
  //   } else {
  //     return 0
  //   }
  // }
}

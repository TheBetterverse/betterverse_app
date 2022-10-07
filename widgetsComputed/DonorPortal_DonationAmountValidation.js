/* DonorPortal_DonationAmountValidation.js */

return async () => {
  let donationAmount = parseFloat(this.DonorPortal_GetDonationAmount())
  console.log(donationAmount)

  let walletBalance = await this.DonorPortal_GetCurrentUserWalletBalance()

  console.log(walletBalance)

  let balanceCheck = donationAmount > walletBalance

  console.log(balanceCheck)
  return balanceCheck
}

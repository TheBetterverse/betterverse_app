/* DonorPortal_DonationAmountValidation.js */

return async () => {
  let donationAmount = parseFloat(this.DonorPortal_GetDonationAmount())

  let walletBalance = await this.DonorPortal_GetCurrentUserWalletBalance()

  let balanceCheck = donationAmount > walletBalance

  return balanceCheck
}

/* DonorPortal_TriggerDonateModal.js */

return function (value) {
  if (this.DonorPortal_GetCurrentUserProfileComplete() === false) {
    this.DonorPortal_RedirectToSignIn()
    return
  }

  if (this.DonorPortal_GetCurrentUserWalletProvider() === 'slide') {
    $setUser('DonorPortal_DonationAmount', '20')
  } else {
    $setUser('DonorPortal_DonationAmount', '20')
  }

  let element = document.getElementById('bv__donatemodal')
  element.style.display = value
}

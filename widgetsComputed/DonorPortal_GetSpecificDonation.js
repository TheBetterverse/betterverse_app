/* DonorPortal_GetSpecificDonation.js */

let memoize = {}

return function () {
  let donation = $getUser('Donation_SelectedDonation')

  if (!(donation in memoize))
    memoize[donation] = $dataGrid('capturedDonationData')[donation]

  return memoize[donation]
}

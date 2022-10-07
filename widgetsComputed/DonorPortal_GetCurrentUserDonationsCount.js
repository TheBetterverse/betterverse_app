/* DonorPortal_GetCurrentUserDonationsCount.js */

return function () {
  let user = fbUser.uid

  return $getGrid('capturedDonationData').filter(row => row.user == user).length
}

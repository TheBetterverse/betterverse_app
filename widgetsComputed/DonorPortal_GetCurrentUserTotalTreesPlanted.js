/* DonorPortal_GetCurrentUserTotalTreesPlanted.js */

return function () {
  let currentUser = fbUser.uid

  return $getGrid('capturedDonationData')
    .filter(row => row.user == currentUser)
    .reduce((total, curr) => total + curr.numberOfTreesPlanted, 0)
}

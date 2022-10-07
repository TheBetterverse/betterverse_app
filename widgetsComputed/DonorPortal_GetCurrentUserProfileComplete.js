/* DonorPortal_GetCurrentUserProfileComplete.js */

return function () {
  let currentUser = this.DonorPortal_GetCurrentUser()
  return currentUser.profileComplete
}

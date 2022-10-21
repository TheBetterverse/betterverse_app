/* DonorPortal_GetCurrentUserPhoneNumber.js */

return function () {
  let currentUser = this.DonorPortal_GetCurrentUser()

  return currentUser.phonenumber
}

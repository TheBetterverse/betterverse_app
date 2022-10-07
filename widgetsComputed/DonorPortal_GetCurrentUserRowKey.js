/* DonorPortal_GetCurrentUserRowKey.js */

return function () {
  let currentUser = this.DonorPortal_GetCurrentUser()

  return currentUser.rowKey
}

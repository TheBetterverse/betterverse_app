/* DonorPortal_GetCurrentUserProfilePicture.js */

return function () {
  let { profileImage } = this.DonorPortal_GetCurrentUser()

  if (profileImage === null)
    return null

  return profileImage.url
}

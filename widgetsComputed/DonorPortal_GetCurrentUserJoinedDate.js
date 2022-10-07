/* DonorPortal_GetCurrentUserJoinedDate.js */

const options = {
  month: 'long',
  year: 'numeric'
}

return function () {
  let dateJoined = this.DonorPortal_GetCurrentUser().dateJoined

  if (dateJoined === null) return ''

  let formatted = new Date(dateJoined).toLocaleDateString('en-us', options)

  return formatted
}

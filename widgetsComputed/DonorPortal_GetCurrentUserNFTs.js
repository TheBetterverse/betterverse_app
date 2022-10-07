/* DonorPortal_GetCurrentUserNFTs.js */

memoize = {}

return function () {
  let user = fbUser.uid

  if (!memoize[user]) {
    memoize[user] = $getGrid('nFTs').filter(row => row.owner == user)
  }

  return memoize[user]
}

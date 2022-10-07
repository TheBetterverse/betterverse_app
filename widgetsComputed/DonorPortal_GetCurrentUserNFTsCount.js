/* DonorPortal_GetCurrentUserNFTsCount.js */

return function () {
  let user = fbUser.uid
  let count = $getGrid('nFTs').filter(row => row.owner == user).length
  return count
}

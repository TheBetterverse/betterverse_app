/* DonorPortal_GetApprovedCharityProjects.js */

return function (charityRowKey) {
  return $getGrid('charityProjects').filter(row => row.charity == charityRowKey)
}

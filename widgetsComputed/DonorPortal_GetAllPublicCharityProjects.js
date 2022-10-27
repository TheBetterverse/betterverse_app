/* DonorPortal_GetAllPublicCharityProjects.js */

return function () {
  //Get todays date in MS
  var nowDate = new Date()
  var today = nowDate.getTime()

  let rows = $getGrid('charityProjects').filter(
    row =>
      row.$projectAccess$display == 'Public' &&
      row.inactiveProject != true &&
      (row.endDate > today || row.noEndDate == true) &&
      row.charity != null &&
      row.currency != null &&
      row.pricePerTree != null &&
      row.yearlyCO2Sequestration != null
  )

  return rows
}

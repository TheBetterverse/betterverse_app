/* DonorPortal_DonateToSelectedCharity.js */

return async project => {

  await this.DonorPortal_SelectedCharityAndProject(
    project.$charity.rowKey,
    project.$charity.charityName,
    project.rowKey,
    project.projectName
  )

  await this.DonorPortal_TriggerDonateModal('block')
}

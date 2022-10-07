/* DonorPortal_ViewSelectedCharity.js */

return async project => {
  await this.DonorPortal_ClearSelectedProjectImages()

  await this.DonorPortal_SelectedCharityAndProject(
    project.$charity.rowKey,
    project.$charity.charityName,
    project.rowKey,
    project.projectName,
    project.projectImage.url
  )

  await this.DonorPortal_TriggerProjectModal('display', project.projectImage.url)
}

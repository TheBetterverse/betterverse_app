/* DonorPortal_ViewSelectedTree.js */

return async row => {
  let { json, $initialDonationRow, rowKey } = row

  await this.DonorPortal_SelectedDonation(
    json,
    $initialDonationRow.rowKey,
    rowKey
  )

  this.DonorPortal_TriggerNFTModal('display')
  $('#bv__nftmodal').scrollTop(0)
}

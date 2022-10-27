/* DonorPortal_ViewSelectedTree.js */

return async row => {
  let { json, $initialDonationRow, rowKey } = row

  $('#bv__nftmodal').scrollTop(0)

  await this.DonorPortal_SelectedDonation(
    json,
    $initialDonationRow.rowKey,
    rowKey
  )

  this.DonorPortal_TriggerNFTModal('display')
}

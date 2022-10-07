/* DonorPortal_SelectedDonation.js */

return async function (json, donationRowKey, nftRowKey) {
  await $setUser('Donation_SelectedDonation', donationRowKey)
  await $setUser('Donation_SelectedNFT', json)
  await $setUser('Donation_SelectedNFTRowKey', nftRowKey)

  return null
}

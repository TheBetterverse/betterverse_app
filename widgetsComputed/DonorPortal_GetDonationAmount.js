/* DonorPortal_GetDonationAmount.js */

return () => {
  let amount = $getUser('DonorPortal_DonationAmount')

  if (!amount) {
    $setUser('DonorPortal_DonationAmount', '20')
    amount = $getUser('DonorPortal_DonationAmount')
  }

  return amount
}

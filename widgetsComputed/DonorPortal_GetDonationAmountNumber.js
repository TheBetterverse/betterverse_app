/* DonorPortal_GetDonationAmount.js */

return () => {
  let amount = $getUser('DonorPortal_DonationAmount')

  return parseFloat(amount.replace(/,/g, '')) 
}

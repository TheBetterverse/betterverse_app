/* DonorPortal_CalculateTreesPlanted.js */

return (donationAmount, pricePerTree) => {
  donationAmount = parseFloat(donationAmount.replace(/,/g, ''))

  const finalDonationAmount = this.DonorPortal_DonationCut(donationAmount)
  
  //const donationCut = donationAmount * cut

  //console.log(finalDonationAmount)
  //const finalDonationAmount = donationAmount - donationCut

  const numberOfTrees = Math.floor(finalDonationAmount / pricePerTree)

  //console.log(numberOfTrees)

  return numberOfTrees
}

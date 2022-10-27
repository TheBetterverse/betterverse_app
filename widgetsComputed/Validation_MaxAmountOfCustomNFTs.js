/* Validation_MaxAmountOfCustomNFTS */

return () => {
    let donation = this.DonorPortal_GetDonationAmountNumber()
    let max = Math.floor(donation / 10)

    console.log('MAX NFT COUNT: ' + max)
    if (max > 10) max = 10

    return max
}
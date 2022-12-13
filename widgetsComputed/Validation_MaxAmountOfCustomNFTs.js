/* Validation_MaxAmountOfCustomNFTS */

return () => {
    let donation = this.DonorPortal_GetDonationAmountNumber()
    let max = Math.floor(donation / 20)

    if (max > 10) max = 10

    return max
}
return function(){

    let comparisonCurrency = this.DonorPortal_GetCurrentUserComparisonCurrency()
    let specificDonation = this.DonorPortal_GetSpecificDonation()

    if (comparisonCurrency == "USD"){
        return '$' + specificDonation.donationAmount.toFixed(2)
    }

    else if(comparisonCurrency == "GBP"){
        totalDonated = this.DonorPortal_GetCurrentUserTotalDonationsAmount('£')
        return '£' + specificDonation.donationAmountGBP.toFixed(2)
    }

    else if(comparisonCurrency == "EUR"){
        totalDonated = this.DonorPortal_GetCurrentUserTotalDonationsAmount('€')
        return '€' + specificDonation.donationAmountEUR.toFixed(2)
    }

    else{
        return null
    }

}
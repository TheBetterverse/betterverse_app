return function(){

    let comparisonCurrency = this.DonorPortal_GetCurrentUserComparisonCurrency()
    let totalDonated = this.DonorPortal_GetCurrentUserTotalDonationsAmount()

    if (comparisonCurrency == "USD"){
        return '$' + parseFloat(totalDonated).toLocaleString()
    }

    else if(comparisonCurrency == "GBP"){
        totalDonated = this.DonorPortal_GetCurrentUserTotalDonationsAmount('£')
        return '£' + parseFloat(totalDonated).toLocaleString()
    }

    else if(comparisonCurrency == "EUR"){
        totalDonated = this.DonorPortal_GetCurrentUserTotalDonationsAmount('€')
        return '€' + parseFloat(totalDonated).toLocaleString()
    }

    else{
        return null
    }

}
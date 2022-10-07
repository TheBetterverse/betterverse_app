return function(){

    let currentUser = this.DonorPortal_GetCurrentUser()
    var currency

    if(currentUser.comparisonCurrency != null){
        currency = currentUser.$comparisonCurrency$display
        return currency
    }   

    if(currentUser.comparisonCurrency == null){
        currency = null
        return currency
    }   

}
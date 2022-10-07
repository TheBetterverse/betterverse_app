return async function(donationAmount){

    //Get USDC balance
    var balanceUSDC = await this.DonorPortal_DisplayUSDCBalance()

    if(donationAmount > balanceUSDC){
        console.log('Insufficient Funds in connected wallet')
        return false
    }
    else{
        return true
    }

}
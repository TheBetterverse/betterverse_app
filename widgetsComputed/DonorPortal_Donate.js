return async function(tokenID, wallet, user, charity, cause, paymentMethod, currency, location, amount, gas, date, nftCount){
    
    var nftCountDecision = document.querySelector('input[name="nftCountRadio"]:checked').value;

    wallet = this.DonorPortal_GetCurrentUserWalletAddress()

    //Donation/transaction functionality here
    var donationSuccess = true

    //NFT transfer here
    var nftTransferSuccess = true
    gas = 0.1

    //Temporary Token ID
    var tokenID = 123456789

    //Once donation is succesful create a row to store data
    if (donationSuccess == true && nftTransferSuccess == true){
        if (nftCountDecision == "1"){
            nftCount = 1
            await this.DonorPortal_CreateDonationRow(tokenID, wallet, user, charity, cause, paymentMethod, currency, location, amount, gas, date, nftCount)
            await this.callWf({ workflow: '-N06gd4TLRQ8JzUPY059' })
        }
        else if(nftCountDecision == ">1"){
            await this.DonorPortal_CreateDonationRow(tokenID, wallet, user, charity, cause, paymentMethod, currency, location, amount, gas, date, nftCount)
            await this.callWf({ workflow: '-N06gd4TLRQ8JzUPY059' })
        }      
    }

    return null
}
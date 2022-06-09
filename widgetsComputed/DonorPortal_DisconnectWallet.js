return function(){

    //User Identifier
    var currentUserRowKey = this.DonorPortal_GetCurrentUserRowKey();

    let text = "Disconnect wallet from account?\nClick OK to disconnect wallet.";
    if (confirm(text) == true) {
        //Remove Wallet Address Value from User row (Set to null)
        $setDataGridVal('users', currentUserRowKey + '.walletAddress', null)
        $setDataGridVal('users', currentUserRowKey + '.walletProvider', null)
        this.DonorPortal_DisableRamp()
        this.DonorPortal_HideTorusButton()
    } else {

    }
    return null
}




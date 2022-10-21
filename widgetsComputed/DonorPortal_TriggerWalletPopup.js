return async () => {

    var walletProvider = await this.DonorPortal_GetCurrentUserWalletProvider()
    if(walletProvider == 'metamask'){
        //open metamask
        // console.log('Open ' + walletProvider)
        
    }

    else if(walletProvider == 'torus'){
        //open torus
        torus.showWallet()
    }

    else if(walletProvider == 'coinbase'){
        //open coinbase
        console.log('Open ' + walletProvider)
    }

    return null
}

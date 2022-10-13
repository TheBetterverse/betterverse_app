return function(){

    const walletProvider = this.DonorPortal_GetCurrentUserWalletProvider()

    if(walletProvider == 'metamask'){
        return null
    }
    else if(walletProvider == 'torus'){
        return null
    }
    else if(walletProvider == 'slide'){
        this.DonorPortal_OpenSlide('Slide')
    }

}
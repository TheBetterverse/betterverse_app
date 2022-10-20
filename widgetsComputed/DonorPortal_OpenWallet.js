return function(){

    const walletProvider = this.DonorPortal_GetCurrentUserWalletProvider()

    if(walletProvider == 'metamask'){
        this.DonorPortal_OpenMetamask()
    }
    else if(walletProvider == 'torus'){
        this.DonorPortal_OpenTorus()
    }
    else if(walletProvider == 'slide'){
        this.DonorPortal_OpenSlide('Slide')
    }

}
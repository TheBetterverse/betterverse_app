return function(){
    if(this.DonorPortal_GetCurrentUserWalletAddress() != null){
        if (!this.DonorPortal_CheckRampActive()) {
            new rampInstantSdk.RampInstantSDK({
                hostAppName: 'Betterverse',
                hostLogoUrl: 'https://uploads-ssl.webflow.com/613e414d36aa8cb1b070c82f/6150c11fa58d4be8cbbbe1a6_betterverse-logomark-black.svg',
                //hostLogoUrl: 'https://rampnetwork.github.io/assets/misc/test-logo.png',
                variant: 'embedded-desktop',
                userAddress: this.DonorPortal_GetCurrentUserWalletAddress(),
                swapAsset: 'MATIC_USDC,MATIC_DAI,MATIC_ETH',
                swapAmount: 10000000, // 10 USDC
                // url: 'https://widget-instant.ramp.network/', // only specify the url if you want to use testnet widget versions,
                hostApiKey: 'me2t3eupzb63tn34a7dbu8mup27dghnktgf98xcs',
                userEmailAddress: fbUser.email,
                containerNode: document.getElementById('ramp-container'),
            }).show()
        } else {
            alert("Ramp is already activated!")
            return null
        }
    }
    else{
            alert("No wallet connected!")
            return null
    }
}
return async function(displayType){
      
    if(displayType == 'embedded'){
        if(this.DonorPortal_CheckRampActive() == false){
            new rampInstantSdk.RampInstantSDK({
                hostAppName: 'Betterverse',
                hostLogoUrl: 'https://raw.githubusercontent.com/RampNetwork/assets/f01ff9e4bec5fbf88728729b1e1c80094ef01f0f/crypto-assets/polygon.svg',
                variant: 'embedded-desktop',
                userAddress: this.DonorPortal_GetCurrentUserWalletAddress(),
                //MATIC_DAI,MATIC_ETH'
                swapAsset: 'MATIC_USDC', 
                swapAmount: 10000000, // 10 USDC
                // url: 'https://widget-instant.ramp.network/', // only specify the url if you want to use testnet widget versions,
                hostApiKey: 'me2t3eupzb63tn34a7dbu8mup27dghnktgf98xcs',
                userEmailAddress: fbUser.email,
                containerNode: document.getElementById('ramp-container'),
            }).show()
        }
    }

    else if(displayType == 'overlay'){
        new rampInstantSdk.RampInstantSDK({
            hostAppName: 'Betterverse',
            hostLogoUrl: 'https://raw.githubusercontent.com/RampNetwork/assets/f01ff9e4bec5fbf88728729b1e1c80094ef01f0f/crypto-assets/polygon.svg',
            userAddress: this.DonorPortal_GetCurrentUserWalletAddress(),
            swapAsset: 'MATIC_USDC', 
            //swapAmount: 10000000, // 10 USDC
            // url: 'https://widget-instant.ramp.network/', // only specify the url if you want to use testnet widget versions,
            hostApiKey: 'me2t3eupzb63tn34a7dbu8mup27dghnktgf98xcs',
            userEmailAddress: fbUser.email,
            variant: 'auto',
        }).show()
    }

    else{
        console.log("Invalid display type parameter")
    }
}
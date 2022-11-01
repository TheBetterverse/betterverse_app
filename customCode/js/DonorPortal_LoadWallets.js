(async () => {

    var wallerProvider = $vm.DonorPortal_GetCurrentUserWalletProvider()
    var walletAddress = $vm.DonorPortal_GetCurrentUserWalletAddress()

    if (wallerProvider == "torus" && walletAddress != null){

      if(!window.torus){
        const torus = new Torus()
          window.torus = torus
          await window.torus.init({
            buildEnv: 'production', // default: production
            enableLogging: true, // default: false
            network: {
              host: 'matic', // default: mainnet
              chainId: 137, // default: 1
              networkName: 'Polygon Mainnet' // default: Main Ethereum Network
            }
            // showTorusButton: false // default: true
          })
          await window.torus.login() // await torus.ethereum.enable()
          const web3 = new Web3(window.torus.provider)
        }
    }
    else if (wallerProvider == "slide" && walletAddress != null){

      if(!window.slide){
        const slide = new Slide.SDK()
        slide.preload();
        window.slide = slide;
        const wallet = await slide.request({ method: "eth_requestAccounts" })
      }

    }
    else{
        return null
    }

})();

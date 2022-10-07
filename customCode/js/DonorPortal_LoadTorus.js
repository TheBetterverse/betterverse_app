(async () => {

    var wallerProvider = $vm.DonorPortal_GetCurrentUserWalletProvider()
    var walletAddress = $vm.DonorPortal_GetCurrentUserWalletAddress()

    if (wallerProvider == "torus" && walletAddress != null){

    const torus = new Torus()
      window.torus = torus
      await window.torus.init({
        buildEnv: 'test', // default: production
        enableLogging: true, // default: false
        network: {
          host: 'mumbai', // default: mainnet
          chainId: 80001, // default: 1
          networkName: 'Mumbai Test Network' // default: Main Ethereum Network
        }
        // showTorusButton: false // default: true
      })
      await window.torus.login() // await torus.ethereum.enable()
      const web3 = new Web3(window.torus.provider)
    }
    else{
        return null
    }

})();

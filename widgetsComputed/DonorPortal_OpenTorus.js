return async function(){

    if(window.torus == undefined){
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
    }

    window.torus.showWallet(); 

    return null
}
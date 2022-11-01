return async function(){

    if(window.torus == undefined){
        const torus = new Torus()
          window.torus = torus

        await window.torus.init({
          buildEnv: 'production',
          enableLogging: true,
          network: {
            host: 'matic', 
            chainId: 137, 
            networkName: 'Polygon Mainnet' 
        }
      })
    }

    window.torus.showWallet(); 

    return null
}
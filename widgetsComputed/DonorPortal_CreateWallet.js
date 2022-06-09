return function(walletProvider){
    var currentUserRowKey = this.DonorPortal_GetCurrentUserRowKey();
    //Wallet Variable
    var wallet = null

    if(walletProvider == "Torus"){
        // wallet = 'TorusWalletAddressHere'

        (async () => {
            const torus = new Torus()
            await torus.init({
            buildEnv: "production", // default: production
            enableLogging: true, // default: false
            network: {
                host: "matic", // default: mainnet
                chainId: 137, // default: 1
                networkName: "Polygon Mainnet" // default: Main Ethereum Network
            },
            // showTorusButton: false // default: true
            });
            await torus.login(); // await torus.ethereum.enable()
            const web3 = new Web3(torus.provider);
            wallet = (await web3.eth.getAccounts())[0]
            //     const web3 = new Web3(torus.provider)
            //     const balance = await web3.eth.getBalance(wallet)
            $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
        })()

    }

     return null
}
return function(walletProvider){

    //User Identifier
    var currentUserRowKey = this.DonorPortal_GetCurrentUserRowKey();
    //Wallet Variable
    var wallet = null

    //Connect Wallet Functionality
    if(walletProvider == "Metamask"){

        const connectWalletHandler = async () => {
            const { ethereum } = window

            if( ethereum && ethereum['providers'] && ethereum.providers.find(({ isMetaMask  }) => isMetaMask ) ) {
                try {
                    const MetamaskProvider = ethereum.providers.find(({ isMetaMask  }) => isMetaMask )
                    const accounts = await MetamaskProvider.request({ method: 'eth_requestAccounts' })
                    wallet = accounts[0]
                    
                    //Save Wallet Address to User Profile Row
                    $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
                    $setDataGridVal('users', currentUserRowKey + '.walletProvider', 'Metamask')
                } catch (err) {
                    console.log(err)
                }
            } else if (ethereum && ethereum.isMetaMask) {
                try {
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
                    wallet = accounts[0]
                    
                    //Save Wallet Address to User Profile Row
                    $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
                    $setDataGridVal('users', currentUserRowKey + '.walletProvider', 'Metamask')
                    this.DonorPortal_CloseConnectWalletModal()

                } catch (err) {
                    console.log(err)
                }
            } else {
                alert('Please install MetaMask')
            }
        }

        connectWalletHandler()
    }

    else if(walletProvider == "Torus"){
        //     await torus.init({
        //         // buildEnv: "production",
        //         network: {
        //             host: "matic", // mandatory
        //             chainId: 137, // Polygon chianID optional
        //             networkName: "Polygon Mainnet", // optional
        //         },
        //         whitelabel: {
        //             theme: {
        //                 isDark: true,
        //                 colors: {
        //                     torusBrand1: "#282c34",
        //                 },
        //             },
        //             defaultLanguage: "en",
        //             logoDark: "https://tkey.surge.sh/images/Device.svg", // Dark logo for light background
        //             logoLight: "https://tkey.surge.sh/images/Device.svg", // Light logo for dark background
        //         }
        //     })


        const connectTorus = async () => {
            const torus = new Torus()
            window.torus = torus
            await window.torus.init({
            buildEnv: "production", // default: production
            enableLogging: true, // default: false
            network: {
                host: "matic", // default: mainnet
                chainId: 137, // default: 1
                networkName: "Polygon Mainnet" // default: Main Ethereum Network
            },
            // showTorusButton: false // default: true
            });
            await window.torus.login(); // await torus.ethereum.enable()
            const web3 = new Web3(window.torus.provider);
            wallet = (await web3.eth.getAccounts())[0]
            //     const web3 = new Web3(torus.provider)
            //     const balance = await web3.eth.getBalance(wallet)
            $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
            $setDataGridVal('users', currentUserRowKey + '.walletProvider', 'Torus')
            this.DonorPortal_CloseConnectWalletModal()
        }

        connectTorus()
    }
    
    else if(walletProvider == "Coinbase Wallet"){
        // const APP_NAME = 'Tangle'
        // const APP_LOGO_URL = 'https://example.com/logo.png'
        // const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/2654ad380c45449aaa54a351f0026d3c' // Jack Jin's infura key
        // const DEFAULT_CHAIN_ID = 1

        // const coinbaseWallet = new CoinbaseWalletSDK({
        //     appName: APP_NAME,
        //     appLogoUrl: APP_LOGO_URL,
        //     darkMode: false
        // })
        // const WalletConnect = window.WalletConnectProvider.default

        // const providerOptions = {
        //     walletlink: {
        //         package: CoinbaseWalletSDK, 
        //         options: {
        //             appName: "Tangle",
        //             infuraId: '2654ad380c45449aaa54a351f0026d3c' 
        //         }
        //     },
        //     walletconnect: {
        //         package: WalletConnect, 
        //         options: {
        //             infuraId: '2654ad380c45449aaa54a351f0026d3c'
        //         }
        //     }
        // }
        
        // wallet = 'MetamaskWalletAddressHere'

        const connectWalletHandler = async () => {
            const { ethereum } = window

            if( ethereum && ethereum['providers'] && ethereum.providers.find(({ isCoinbaseWallet  }) => isCoinbaseWallet ) ) {
                try {
                    const CoinbaseProvider = ethereum.providers.find(({ isCoinbaseWallet  }) => isCoinbaseWallet )
                    const accounts = await CoinbaseProvider.request({ method: 'eth_requestAccounts' })
                    wallet = accounts[0]
                    
                    //Save Wallet Address to User Profile Row
                    $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
                } catch (err) {
                    console.log(err)
                }
            } else if (ethereum) {
                try {
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
                    wallet = accounts[0]
                    
                    //Save Wallet Address to User Profile Row
                    $setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
                    $setDataGridVal('users', currentUserRowKey + '.walletProvider', 'Coinbase')
                    this.DonorPortal_CloseConnectWalletModal()

                } catch (err) {
                    console.log(err)
                }
            } else {
                alert('Please install MetaMask')
            }
        }

        connectWalletHandler()
    }
    
    return null
}
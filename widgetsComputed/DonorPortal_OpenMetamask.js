return async function(){

    const { ethereum } = window
        if (
            ethereum &&
            ethereum['providers'] &&
            ethereum.providers.find(({ isMetaMask }) => isMetaMask)
        ) {
            try {
                const MetamaskProvider = ethereum.providers.find(
                    ({ isMetaMask }) => isMetaMask
                )
                const accounts = await MetamaskProvider.request({
                    method: 'eth_requestAccounts'
                })
                wallet = accounts[0]
            } catch (err) {
                console.log(err)
            }
        } else if (ethereum && ethereum.isMetaMask) {
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                })
                wallet = accounts[0]
            } catch (err) {
                console.log(err)
            }
        }


    return null
}
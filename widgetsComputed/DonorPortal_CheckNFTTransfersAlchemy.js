const TreeContractAddress = this.Contracts().TreeContractAddress
const TreeContractABI = this.Contracts().TreeContractABI

return async function(){
    const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/HMNCIELr_xefT8GIcZ1zqhFbXbXulD-7');
    const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress);
    const currentUserWalletAddress = this.DonorPortal_GetCurrentUserWalletAddress()

    const response = await fetch("https://polygon-mainnet.g.alchemy.com/v2/HMNCIELr_xefT8GIcZ1zqhFbXbXulD-7",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
                param: [
                    {
                        fromBlock: "0x0",
                        toBlock: "latest",
                        contractAddresses: [
                                TreeContractAddress
                        ],
                        category: [
                                "external"
                        ],
                        withMetadata: false,
                        excludeZeroValue: true,
                        maxCount: "0x3e8",
                        fromAddress: currentUserWalletAddress
                    }
                ]
        })
    })
    const data = response.json()

    console.log(data)

    return data
}
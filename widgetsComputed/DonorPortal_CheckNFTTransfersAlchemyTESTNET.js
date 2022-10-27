const TreeContractAddress = this.ContractsTESTNET().TreeContractAddress
const TreeContractABI = this.ContractsTESTNET().TreeContractABI

return async function(){
    const web3 = new Web3('https://polygon-mumbai.g.alchemy.com/v2/dRrclX6ikOV1fZHA5fHhaORKzPB6MoEj');
    const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress);
    const currentUserWalletAddress = this.DonorPortal_GetCurrentUserWalletAddress()

    const response = await fetch("https://polygon-mumbai.g.alchemy.com/v2/dRrclX6ikOV1fZHA5fHhaORKzPB6MoEj",{
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
                        withMetadata: true,
                        excludeZeroValue: true,
                        maxCount: "0x3e8",
                        fromAddress: currentUserWalletAddress
                    }
                ]
        })
    })
    .then((response) => {
        var data = response.json()
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    });

    return data
}
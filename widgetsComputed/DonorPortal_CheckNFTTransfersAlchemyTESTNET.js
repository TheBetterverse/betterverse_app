const TreeContractAddress = this.ContractsTESTNET().TreeContractAddress
const TreeContractABI = this.ContractsTESTNET().TreeContractABI
const web3 = new Web3('https://polygon-mumbai.g.alchemy.com/v2/dRrclX6ikOV1fZHA5fHhaORKzPB6MoEj');
const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress);
//const currentUserWalletAddress = this.DonorPortal_GetCurrentUserWalletAddress()

return async function(){
    await fetch("https://polygon-mumbai.g.alchemy.com/v2/dRrclX6ikOV1fZHA5fHhaORKzPB6MoEj",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "alchemy_getAssetTransfers",
                params: [
                    {
                        fromBlock: "0x0",
                        toBlock: "latest",
                        contractAddresses: [
                                TreeContractAddress
                        ],
                        category: [
                                "erc721"
                        ],
                        withMetadata: false,
                        excludeZeroValue: true,
                        maxCount: "0x3e8",
                        order: "desc"
                        //fromAddress: currentUserWalletAddress
                    }
                ]
        })
    })
    .then(response => response.json())
    .then(result => $setGlobalModel('transfers', result.result.transfers))
    .catch(error => console.log('error', error));

    var allTransfers = $getGlobalModel('transfers')

    const nftTrades = allTransfers.filter(transfer => transfer.from =! "0x0000000000000000000000000000000000000000");

    console.log(nftTrades)


    return nftTrades
}

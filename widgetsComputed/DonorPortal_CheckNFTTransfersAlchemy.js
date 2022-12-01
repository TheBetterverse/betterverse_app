const isProduction = this.Global_IsProduction()

//MAINNET
const TreeContractAddress = this.Contracts().TreeContractAddress
const TreeContractABI = this.Contracts().TreeContractABI
const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/HMNCIELr_xefT8GIcZ1zqhFbXbXulD-7');

//TESTNET
const TreeContractAddressTESTNET = this.ContractsTESTNET().TreeContractAddress
const TreeContractABITESTNET = this.ContractsTESTNET().TreeContractABI
const web3TESTNET = new Web3('https://polygon-mumbai.g.alchemy.com/v2/dRrclX6ikOV1fZHA5fHhaORKzPB6MoEj');

return async function(tokenIDs){

    if(isProduction == true){

    }
    else{
        const TreeContract = new web3TESTNET.eth.Contract(TreeContractABITESTNET, TreeContractAddressTESTNET);
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
                                TreeContractAddressTESTNET
                            ],
                            category: [
                                    "erc721"
                            ],
                            withMetadata: true,
                            excludeZeroValue: false,
                            maxCount: "0x3e8",
                            order: "desc"
                        }
                    ]
            })
        })
        .then(response => response.json())
        .then(result => $setGlobalModel('transfers', result.result.transfers))
        .catch(error => console.log('error', error)); 
    }

    var allTransfers = $getGlobalModel('transfers')
    var filteredTransfers = []

    var tokenID = ethers.utils.hexDataLength(278)
    console.log(tokenID)

    //filter out transfers for each nft I currently own (by tokenID)
    /*for(i = 0; i < tokenIDs.length; i++){
        tokenIDs[i]
        filteredTransfers[i] = allTransfers.filter(transfer => transfer.from =! "0x0000000000000000000000000000000000000000");
    }*/

    //get the latest trade by timestamp
    //transfer nft to user with that wallet address on their account, if not remove user

    var nftTrades = allTransfers.filter(transfer => transfer.from =! "0x0000000000000000000000000000000000000000");

    console.log(allTransfers)
    console.log(nftTrades)

    return nftTrades
}

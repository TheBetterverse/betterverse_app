const TreeContractAddress = this.Contracts().TreeContractAddress
const TreeContractABI = this.Contracts().TreeContractABI

return async function(tokenID){
    const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/bBfTnKz6QUjRu1S03pXLORYKHjhnsRa7');
    const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress);

    var json = await TreeContract.methods.tokenURI(tokenID).call()
    //String

    return json
}

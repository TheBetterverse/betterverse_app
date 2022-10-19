const TreeContractAddress = this.ContractsTESTNET().TreeContractAddress
const TreeContractABI = this.ContractsTESTNET().TreeContractABI

return async function(tokenID){
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const TreeContract = new web3.eth.Contract(TreeContractABI, TreeContractAddress);

    var json = await TreeContract.methods.tokenURI(tokenID).call()
    //String

    return json
}

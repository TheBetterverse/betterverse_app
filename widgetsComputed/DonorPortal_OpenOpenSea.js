return function(nftRowKey){

    let tokenID = $dataGrid('nFTs')[nftRowKey].tokenID
    const TreeContractAddress = this.Contracts().TreeContractAddress

    var openSeaURL = 'https://opensea.io/assets/matic/' + TreeContractAddress + '/'
    var url = openSeaURL + tokenID

    window.open(url)

}
return function(nftRowKey){

    let tokenID = $dataGrid('nFTs')[nftRowKey].tokenID


    var openSeaURL = 'https://testnets.opensea.io/assets/mumbai/0xd046fcff9ada0d05e9baaac4a851ec1be21c9aa7/'
    var url = openSeaURL + tokenID

    window.open(url)

}
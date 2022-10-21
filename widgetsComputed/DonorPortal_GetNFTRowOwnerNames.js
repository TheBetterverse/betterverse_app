return function(){

    const users = $getGrid('users')
    let nftRow = $dataGrid('nFTs')[$getUser('Donation_SelectedNFTRowKey')]

    let nftOwner = _.find(users, { user: nftRow.owner })

    if(!nftOwner.username || nftOwner.username.length == 0){
        return nftOwner.firstName + " " + nftOwner.lastName
    }

    else{
        return nftOwner.username
    }


}
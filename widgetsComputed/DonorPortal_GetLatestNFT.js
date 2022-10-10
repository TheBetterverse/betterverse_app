return async function(){

    document.getElementById("bv__nftrefresh__textinfo").style.display = "inline-block";
    document.getElementById("bv__nftrefresh__textinfo").innerText = 'Checking for updates'

    //Checking for updates...

    var currentUserNFTs = await this.DonorPortal_GetCurrentUserNFTs()
    var currentUserNFTsIDs = []
    var currentUserNFTsJSONs = []
    var returnedJSONs = []

    //Workflow data
    var updateRequiredNFTsRowKeys = []
    var updateRequiredNFTsJSONs = []

    console.log('Get users current NFTs:')
    //Get current NFT token IDs and JSONs
    for (i = 0; i < currentUserNFTs.length; i++){
        currentUserNFTsIDs[i] = currentUserNFTs[i].tokenID
        currentUserNFTsJSONs[i] = currentUserNFTs[i].json
    }
    console.log('---------------------')

    try {

        console.log('Getting latest JSON for each NFT')
        //Get latest JSON for each NFT
        for (n = 0; n < currentUserNFTs.length; n++){
            var returnedJSON = await this.DonorPortal_GetTokenURI(currentUserNFTsIDs[n])
            var resolvedJSON = await this.DonorPortal_ResolveNFTURL(returnedJSON)
            returnedJSONs[n] = resolvedJSON
        }
        console.log('---------------------')

        console.log('Compare JSON for each NFT to see if updates are required')
        //Compare JSON for each NFT
        for (u = 0; u < currentUserNFTs.length; u++){
            if(currentUserNFTsJSONs[u] != returnedJSONs[u]){
                updateRequiredNFTsRowKeys.push(currentUserNFTs[u].rowKey)
                updateRequiredNFTsJSONs.push(returnedJSONs[u])
            }
        }
        console.log('---------------------')

        //Updating nfts
        console.log(updateRequiredNFTsRowKeys.length + ' NFTs require an update')
        if (updateRequiredNFTsJSONs.length > 0){
            document.getElementById("bv__nftrefresh__textinfo").innerText = 'Updating NFTs'
            this.callWf({
                            workflow: '-NDyxl-6eHUgqV2fk2tg',
                            payload: {
                                nftRowKeys: updateRequiredNFTsRowKeys,
                                nftJSONs: updateRequiredNFTsJSONs
                            },
            })

            //Update/refresh component
        }
        else{
            document.getElementById("bv__nftrefresh__textinfo").innerText = 'NFTs are already up to date'
            await new Promise(resolve => setTimeout(resolve, 3000));
            document.getElementById("bv__nftrefresh__textinfo").innerText = ''
            return true
        }    

        await new Promise(resolve => setTimeout(resolve, 3000));
        document.getElementById("bv__nftrefresh__textinfo").innerText = 'NFTs successfully updated'
        await new Promise(resolve => setTimeout(resolve, 3000));
        document.getElementById("bv__nftrefresh__textinfo").innerText = ''

        return returnedJSONs
    }
    catch(err) {
        console.log(err)
        document.getElementById("bv__nftrefresh__textinfo").innerText = 'Error please try again'
        await new Promise(resolve => setTimeout(resolve, 3000));
        document.getElementById("bv__nftrefresh__textinfo").innerText = ''
    }

    return null
}
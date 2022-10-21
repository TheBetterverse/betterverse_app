/* DonorPortal_GetLatestNFT.js */

return async event => {
  console.error('WHAT THE HELL')
  let refreshButton = event.target

  refreshButton.setAttribute('state', 'boh')

  //Checking for updates...
  var currentUserNFTs = await this.DonorPortal_GetCurrentUserNFTs()
  var currentUserNFTsIDs = []
  var currentUserNFTsJSONs = []
  var returnedJSONs = []

  //Workflow data
  var updateRequiredNFTsRowKeys = []
  var updateRequiredNFTsJSONs = []

  //Get current NFT token IDs and JSONs
  for (let i = 0; i < currentUserNFTs.length; i++) {
    currentUserNFTsIDs[i] = currentUserNFTs[i].tokenID
    currentUserNFTsJSONs[i] = currentUserNFTs[i].json
  }

  try {
    //Get latest JSON for each NFT
    for (let n = 0; n < currentUserNFTs.length; n++) {
      var returnedJSON = await this.DonorPortal_GetTokenURIAlchemy(
        currentUserNFTsIDs[n]
      )
      var resolvedJSON = await this.DonorPortal_ResolveNFTURL(returnedJSON)
      returnedJSONs[n] = resolvedJSON
    }

    console.log('Compare JSON for each NFT to see if updates are required')
    //Compare JSON for each NFT
    for (let u = 0; u < currentUserNFTs.length; u++) {
      if (currentUserNFTsJSONs[u] != returnedJSONs[u]) {
        updateRequiredNFTsRowKeys.push(currentUserNFTs[u].rowKey)
        updateRequiredNFTsJSONs.push(returnedJSONs[u])
      }
    }

    //Updating nfts
    console.log(updateRequiredNFTsRowKeys.length + ' NFTs require an update')
    if (updateRequiredNFTsJSONs.length > 0) {
      // document.getElementById('bv__nftrefresh__textinfo').innerText =
      //   'Updating NFTs'
      this.callWf({
        workflow: '-NDyxl-6eHUgqV2fk2tg',
        payload: {
          nftRowKeys: updateRequiredNFTsRowKeys,
          nftJSONs: updateRequiredNFTsJSONs
        }
      })
    } else {
      // document.getElementById('bv__nftrefresh__textinfo').innerText =
      //   'NFTs are already up to date'
      await new Promise(resolve => setTimeout(resolve, 3000))
      // document.getElementById('bv__nftrefresh__textinfo').innerText = ''
      refreshButton.setAttribute('state', 'default')
      return true
    }

    await new Promise(resolve => setTimeout(resolve, 3000))
    // document.getElementById('bv__nftrefresh__textinfo').innerText =
    //   'NFTs successfully updated'

    $setGlobalModel('dashboardRefresh', true)
    setTimeout(() => {
      $setGlobalModel('dashboardRefresh', false)
    }, 1000)

    await new Promise(resolve => setTimeout(resolve, 3000))
    refreshButton.setAttribute('state', 'default')

    return returnedJSONs
  } catch (err) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    refreshButton.setAttribute('state', 'error')
    refreshButton.setAttribute('disabled', false)
  }

  setTimeout(() => refreshButton.setAttribute('state', 'default'), 6000)

  return null
}

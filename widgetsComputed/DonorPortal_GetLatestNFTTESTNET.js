/* DonorPortal_GetLatestNFT.js */

function setLoadingState(button) {
  button.setAttribute('state', 'loading')
  button.parentElement.disabled = true
}

function endLoadingState(button, state = 'default') {
  button.addEventListener(
    'animationiteration',
    () => {
      button.setAttribute('state', state)
      button.parentElement.disabled = false
    },
    { once: true }
  )
}

return async event => {
  let refreshButton = event.target

  setLoadingState(refreshButton)

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
      var returnedJSON = await this.DonorPortal_GetTokenURIAlchemyTESTNET(
        currentUserNFTsIDs[n]
      )
      var resolvedJSON = await this.DonorPortal_ResolveNFTURL(returnedJSON)
      returnedJSONs[n] = resolvedJSON
    }

    for (let u = 0; u < currentUserNFTs.length; u++) {
      if (currentUserNFTsJSONs[u] != returnedJSONs[u]) {
        updateRequiredNFTsRowKeys.push(currentUserNFTs[u].rowKey)
        updateRequiredNFTsJSONs.push(returnedJSONs[u])
      }
    }

    //Updating nfts
    console.log(updateRequiredNFTsRowKeys.length + ' NFTs require an update')
    if (updateRequiredNFTsJSONs.length > 0) {
      this.callWf({
        workflow: '-NDyxl-6eHUgqV2fk2tg',
        payload: {
          nftRowKeys: updateRequiredNFTsRowKeys,
          nftJSONs: updateRequiredNFTsJSONs
        }
      })
    } else {
      await new Promise(resolve => setTimeout(resolve, 3000))
      return true
    }

    await new Promise(resolve => setTimeout(resolve, 3000))

    $setGlobalModel('dashboardRefresh', true)
    setTimeout(() => {
      $setGlobalModel('dashboardRefresh', false)
    }, 1000)

    await new Promise(resolve => setTimeout(resolve, 3000))

    return returnedJSONs
  } catch (err) {
    console.error(err)

    await new Promise(resolve => setTimeout(resolve, 3000))
    refreshButton.setAttribute('state', 'error')
  } finally {
    endLoadingState(refreshButton)
  }
}

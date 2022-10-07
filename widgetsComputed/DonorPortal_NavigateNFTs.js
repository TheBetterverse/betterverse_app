// DonorPortal_NavigateProjects.js

return function(direction, selectedNFT){

    let nfts = this.DonorPortal_GetCurrentUserNFTs()
    let currentNFTIndex

    for (i = 0; i < nfts.length; i++){
        if(nfts[i].rowKey == selectedNFT){
            currentNFTIndex = i
        }        
    }

    if (direction == 'left'){
        //if on first nft go to last in last
        if (currentNFTIndex == 0){
            currentNFTIndex = nfts.length
        }
        let newSelectedNFT = nfts[currentNFTIndex-1].rowKey
        let newSelectedNFTjson = nfts[currentNFTIndex-1].json
        let newSelectedDonation = nfts[currentNFTIndex-1].initialDonationRow

        $setUser('Donation_SelectedNFTRowKey', newSelectedNFT)
        $setUser('Donation_SelectedNFT', newSelectedNFTjson)
        $setUser('Donation_SelectedDonation', newSelectedDonation)

    }

    else if(direction == 'right'){
        //if on last nft go to first
        if (currentNFTIndex == nfts.length - 1){

            currentNFTIndex = 0
            let newSelectedNFTjson = nfts[currentNFTIndex].json
            let newSelectedDonation = nfts[currentNFTIndex].initialDonationRow
            let newSelectedNFT = nfts[currentNFTIndex].rowKey
            $setUser('Donation_SelectedNFTRowKey', newSelectedNFT)
            $setUser('Donation_SelectedNFT', newSelectedNFTjson)
            $setUser('Donation_SelectedDonation', newSelectedDonation)
        }

        else if (currentNFTIndex >= 0){

            let newSelectedNFTjson = nfts[currentNFTIndex+1].json
            let newSelectedDonation = nfts[currentNFTIndex+1].initialDonationRow
            let newSelectedNFT = nfts[currentNFTIndex+1].rowKey
            $setUser('Donation_SelectedNFTRowKey', newSelectedNFT)
            $setUser('Donation_SelectedNFT', newSelectedNFTjson)
            $setUser('Donation_SelectedDonation', newSelectedDonation)
            
        }

    }

}
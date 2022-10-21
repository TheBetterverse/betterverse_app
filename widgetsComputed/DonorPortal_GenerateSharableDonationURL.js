return async function (donationRowKey, nftRowKey, social) {

    let sharedPages = $getGrid('sharedPages')
    let nft = $dataGrid('nFTs')[nftRowKey]
    var urlExtension = ''
    var shortenedLink = ''

    const message = 'Check out my donation on Betterverse! '
    const domainAndWorkspace = await this.Global_ReturnDomainWorkspaceURL()
    var shareDonationURL = ''

    //check if there is a row with the following donationRow, ntfRow
    let alreadyExistingSharedPage = await _.find(sharedPages, { donation:donationRowKey, nft:nftRowKey  } )

    if (alreadyExistingSharedPage){
        shortenedLink = alreadyExistingSharedPage.shortURL
    }

    //Donation hasn't been shared before - create url extension
    else{
        document.getElementById("bv__nftmodal__sharecard__spinner").style.display = "block";

        urlExtension = nft.nftType + nft.tokenID
        shareDonationURL = domainAndWorkspace + '?tab=-Mx_5FLL2jlxjXYUMdIL&subtab=-N5tjvgst8HEWrJ13X4w' + '&nft=' + urlExtension

        let payload = {
            urlParam: shareDonationURL
        }

        bitlyResponse = await this.$wfGetData('-NC5hWhayZEOxx2Z4nqO', payload)

        let newShareRow = await $dgAddRow('sharedPages',  {donation: donationRowKey, nft: nftRowKey, user: fbUser.uid, urlExtension: urlExtension, shortURL: bitlyResponse.link })
        
        shortenedLink = bitlyResponse.link
    }


    const twitter = 'http://www.twitter.com/share?text=' + message + encodeURIComponent(shortenedLink);
    const facebook = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shortenedLink);
    const linkedin = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(shortenedLink);
    const whatsapp = 'whatsapp://send?text=' + message + encodeURIComponent(shortenedLink);
    const telegram = 'https://t.me/share/url?url=' + encodeURIComponent(shortenedLink); 

    if(social == "twitter"){
        this.DonorPortal_OpenShareURL(social, twitter)
    }

    else if(social == "facebook"){
        this.DonorPortal_OpenShareURL(social, facebook)
    }

    else if(social == 'telegram'){
        this.DonorPortal_OpenShareURL(social, telegram)
    }

    else if(social == "linkedin"){
        this.DonorPortal_OpenShareURL(social, linkedin)
    }

    else if (social == 'whatsapp'){
        this.DonorPortal_OpenShareURL(social, whatsapp)
    }

    else if (social == "copy"){
        this.DonorPortal_OpenShareURL(social, shortenedLink)
    }

}
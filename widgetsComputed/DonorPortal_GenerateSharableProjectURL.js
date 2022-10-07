return async function (projectRowKey, social) {

    let sharedPages = $getGrid('sharedPages')
    let projectRow = $dataGrid('charityProjects')[projectRowKey]
    var urlExtension = ''
    var shortenedLink = ''

    const message = 'Check out this project on Betterverse! '
    const domainAndWorkspace = this.Global_ReturnDomainWorkspaceURL()
    var shareProjectURL = ''

    //check if there is a row with the following project
    let alreadyExistingSharedPage =  await _.find(sharedPages, { project:projectRowKey })

    if (alreadyExistingSharedPage){
        shortenedLink = alreadyExistingSharedPage.shortURL
    }

    //Project hasn't been shared before
    else{
        document.getElementById("bv__nftmodal__sharecard__spinner").style.display = "block";

        var projectName = projectRow.projectName
        urlExtension = projectName.replace(/\s/g, '');
        shareProjectURL = domainAndWorkspace + '?tab=-Mx_5FLL2jlxjXYUMdIL&subtab=-N5tkaD_9aNYxGAA6ZD1' + '&project=' + urlExtension

        let payload = {
            urlParam: shareProjectURL
        }

        bitlyResponse = await this.$wfGetData('-NC5hWhayZEOxx2Z4nqO', payload)

        let newShareRow = await $dgAddRow('sharedPages',  { project:projectRowKey, urlExtension: urlExtension, user: fbUser.uid, shortURL: bitlyResponse.link })

        shortenedLink = bitlyResponse.link
    }


    
    const twitter = 'http://www.twitter.com/share?text=' + message + " %20" + encodeURIComponent(shortenedLink);
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
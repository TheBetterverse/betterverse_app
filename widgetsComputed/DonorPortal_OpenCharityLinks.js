return function(charityRow, urlChoice){

    var websiteURL = charityRow.websiteURL
    var twitterURL = charityRow.twitterURL
    var discordURL = charityRow.discordURL

    if(urlChoice == "website"){
        window.open(websiteURL, '_blank').focus();
    }

    else if(urlChoice == "twitter"){
        window.open(twitterURL, '_blank').focus();
    }

    else{
        window.open(discordURL, '_blank').focus();
    }

}
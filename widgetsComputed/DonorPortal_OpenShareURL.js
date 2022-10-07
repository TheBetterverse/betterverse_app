return function(social, url){

    if(social == "twitter"){
        window.open(url)
    }

    else if(social == "facebook"){
        window.open(url)
    }

    else if(social == 'telegram'){
        window.open(url)
    }

    else if(social == "linkedin"){
        window.open(url)
    }

    else if (social == 'whatsapp'){
        window.open(url)
    }

    else if (social == "copy"){
        this.$copyText(url)
        alert('Link copied!');
    }

    document.getElementById("bv__nftmodal__sharecard__spinner").style.display = "none";

    return null
}
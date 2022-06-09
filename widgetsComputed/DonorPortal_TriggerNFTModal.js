return function(trigger){

    if (trigger == "display"){
        var element = document.getElementById("nft-modal");
        element.style.display = "block";
    }

    else if (trigger == "hide"){
        var element = document.getElementById("nft-modal");
        element.style.display = "none";
    }

    else{
        return null
    }

}
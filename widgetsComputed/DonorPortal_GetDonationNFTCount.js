return function(){

    const singleNFT = document.getElementById('bv__donatemodal__nosplit').checked
    var nftCount = 1

    if (singleNFT == true){
        return nftCount
    }
    else {
        nftCount = document.getElementById('bv__comps__nftcount').value
        return nftCount
    }
}
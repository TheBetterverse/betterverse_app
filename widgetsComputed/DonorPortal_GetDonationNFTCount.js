return function(){

    // const singleNFT = document.getElementById('bv__donatemodal__nosplit').checked
    // var nftCount = 1

    if (document.getElementById('bv__donatemodal__nosplit').checked == true){
        console.log(document.getElementById('bv__donatemodal__nosplit'))
        return 1
    }
    else {
        console.log(document.getElementById('bv__comps__nftcount'))


        nftCount = document.getElementById('bv__comps__nftcount').value
        return nftCount
    }
}
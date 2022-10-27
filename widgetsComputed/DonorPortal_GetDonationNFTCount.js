return function () {
  // const singleNFT = document.getElementById('bv__donatemodal__nosplit').checked
  // var nftCount = 1

  if (document.getElementById('bv__donatemodal__nosplit').checked == true) {
    return 1
  } else {
    nftCount = document.getElementById('bv__comps__nftcount').value
    return nftCount
  }
}

/* DonorPortal_TriggerNFTModal.js */

return function (trigger) {
  var element = document.getElementById('bv__nftmodal')

  if (trigger == 'display') element.style.display = 'block'
  else if (trigger == 'hide') element.style.display = 'none'
}

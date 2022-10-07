/* DonorPortal_TriggerMobileNav.js */

return function () {
  console.log(document.getElementById('bv__mobilenavbar__closeicon'))

  document
    .getElementById('bv__mobilenavbar__compassicon')
    .classList.toggle('hide')

  document
    .getElementById('bv__mobilenavbar__closeicon')
    .classList.toggle('hide')

  document.getElementById('bv__mobile__navbar').classList.toggle('display')
}

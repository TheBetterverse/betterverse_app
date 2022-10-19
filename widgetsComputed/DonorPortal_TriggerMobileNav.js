/* DonorPortal_TriggerMobileNav.js */

return function () {
  document
    .getElementById('bv__mobilenavbar__compassicon')
    .classList.toggle('hide')

  document
    .getElementById('bv__mobilenavbar__closeicon')
    .classList.toggle('hide')

  document.getElementById('bv__mobile__navbar').classList.toggle('display')
}

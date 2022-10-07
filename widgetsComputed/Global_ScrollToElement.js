/* Global_ScrollToElement.js */

return function (id) {
  document
    .getElementById(id)
    .scrollIntoView({ behavior: 'smooth', inline: 'end' })
  // document.getElementById(id).scrollIntoView()
  return null
}

/* DonorPortal_SettingsFormHandler.js */

let form = {}

return event => {
  form[event.target.name] = event.target.value

  let changed = Object.entries(form).reduce((changed, [_, value]) => {
    if (value !== '') changed = true
    return changed
  }, false)

  let saveButtons = [
    ...document.getElementsByClassName('bv__settings__savechangesbtn')
  ]
  saveButtons.forEach(el => (el.disabled = !changed))

  $('.bv__settings__updatetxt').each((_, el) => el.classList.add('hidden'))

  let inputs = [...document.getElementsByTagName('input')]
  inputs.forEach(el => el.dispatchEvent(new Event('input')))
}

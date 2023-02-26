/* DonorPortal_ProcessDonationAmount.js */

function debounceInput(cb, delay = 1024) {
  let timeout
  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

function setCaretToEnd(el) {
  let selection = document.getSelection()
  let range = document.createRange()

  range.setStart(el.childNodes[0], el.innerText.length)

  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

let debouncedPart = debounceInput(async event => {
  let amount = event.target.textContent

  if (!amount) amount = '25'

  if (parseInt(amount) < 25) amount = '25'
  else if (parseInt(amount) > 1000000) amount = '1000000'

  event.target.textContent = parseInt(amount).toLocaleString('en-us')

  setCaretToEnd(event.srcElement)

  await $setUser('DonorPortal_DonationAmount', event.target.textContent)
})

return async event => {
  if (event.target.id === 'bv__donatemodal__donationamountinput') {
    if (event.target.textContent) {
      event.target.textContent = event.target.textContent
        .trim()
        .replace(/\D/g, '')
        .slice(0, 7)
      setCaretToEnd(event.srcElement)
    }

    await debouncedPart(event)
  }

  if (event.target.name === 'slide-donation-amount') {
    await $setUser('DonorPortal_DonationAmount', event.target.value)
  }
}

/* Utilities_DebounceInput */

function Utilities_DebounceInput(cb, delay = 640) {
  let timeout

  return (...args) => {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}

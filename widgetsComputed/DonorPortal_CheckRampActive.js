return () => {
    const rampContainer = document.getElementById('ramp-container')
    const contents = rampContainer.innerHTML
    if (contents) {
        return true
    } else {
        return false
    }
}
return function() {
    const disconnctTorus = async () => {
        console.log("LOGOUT TORUS")
        await window.torus.logout()
        await window.torus.hideTorusButton()
    }
    disconnctTorus()
}


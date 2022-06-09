const fonts = $dataGrid('extensions')['-N-ba4bEadmSDm6DLv4X'].files
const urls = []
const queue = []

if (fonts && !document.getElementById('documanFonts')) {
    for (let file of fonts) {
        queue.push(new Promise((resolve) => {
            $vm.$storageService
                .getFileUrl($vm.currentDash, file.id, (err, url) => {
                    if (err) {
                        console.error(err)
                    } else {
                        urls.push(url)
                    }

                    resolve()
                })
        }))
    }
}

Promise.all(queue).then(() => {
    if (document.getElementById('documanFonts')) return

    let includeText = `
@font-face {
font-family: "Documan";
src:
    `

    for (let fontUrl of urls) {
        includeText += `\n\r  url("${fontUrl}") format("${getFontFormat(fontUrl)}"),`
    }

    includeText = includeText.slice(0, -1)
    includeText += ';\n\r}'

    embedInDOM(includeText)
})

function getFontFormat(url) {
    const ext = $vm.$getUrlExtension(url)

    switch (ext) {
        case 'ttf': return 'truetype'
        case 'woff': return 'woff'
        case 'woff2': return 'woff2'
        case 'otf': return 'opentype'
    }
}

function embedInDOM(content) {
    const style = document.createElement('style')
    style.id = 'documanFonts'
    style.textContent = content
    document.head.appendChild(style)
}

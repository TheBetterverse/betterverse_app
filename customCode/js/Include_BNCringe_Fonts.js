const fonts = [
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fa6c7ba60-e642-11ec-945c-57ef8de2abfb_BNCringeSans-Light.otf?alt=media&token=7f84044b-2455-4058-abc2-8e4c20af5f50'
        ],
        weight: 300
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fa4a1f430-e642-11ec-945c-57ef8de2abfb_BNCringeSans-Regular.otf?alt=media&token=94cd63b9-0a84-49ff-b3e7-ec01ee8f6d07'
        ],
        weight: 400
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fa5b3b250-e642-11ec-945c-57ef8de2abfb_BNCringeSans-Medium.otf?alt=media&token=3eb70a90-69a0-4fcb-a8a2-1cbc6f8658bf'
        ],
        weight: 500
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fa7d22580-e642-11ec-945c-57ef8de2abfb_BNCringeSans-Bold.otf?alt=media&token=933dadcb-4137-4f73-b5c7-ee60232a2b25'
        ],
        weight: 700
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fa3629660-e642-11ec-945c-57ef8de2abfb_BNCringeSans-Black.otf?alt=media&token=bd5a1f42-f5dc-4cf7-87aa-d18816970a7b'
        ],
        weight: 900
    },
]

if (!document.getElementById('BNCringeFonts')) {
    let includeText = ''

    for (let font of fonts) {
        let fontFace = `
@font-face {
font-family: "BN Cringe Sans";
font-weight: ${font.weight};
src:`

        for (let fontUrl of font.urls) {
            fontFace += `\n\r  url("${fontUrl}") format("${getFontFormat(fontUrl)}"),`
        }

        fontFace = fontFace.slice(0, -1)
        fontFace += ';\n\r}\n\r'

        includeText += fontFace
    }

    embedInDOM(includeText)

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
        style.id = 'BNCringeFonts'
        style.textContent = content
        document.head.appendChild(style)
    }
}

// const fonts = $dataGrid('extensions')['-N3xRbJi4hwoJ2KCJWh6'].files
// const urls = []
// const queue = []

// if (fonts && !document.getElementById('bncringfonts')) {
//     for (let file of fonts) {
//         queue.push(new Promise((resolve) => {
//             $vm.$storageService
//                 .getFileUrl($vm.currentDash, file.id, (err, url) => {
//                     if (err) {
//                         console.error(err)
//                     } else {
//                         urls.push(url)
//                     }

//                     resolve()
//                 })
//         }))
//     }
// }

// Promise.all(queue).then(() => {
//     if (document.getElementById('bncringfonts')) return

//     let includeText = `
// @font-face {
// font-family: "BN Cringe";
// src:
//     `

//     for (let fontUrl of urls) {
//         includeText += `\n\r  url("${fontUrl}") format("${getFontFormat(fontUrl)}"),`
//     }

//     includeText = includeText.slice(0, -1)
//     includeText += ';\n\r}'

//     embedInDOM(includeText)
// })

// function getFontFormat(url) {
//     const ext = $vm.$getUrlExtension(url)

//     switch (ext) {
//         case 'ttf': return 'truetype'
//         case 'woff': return 'woff'
//         case 'woff2': return 'woff2'
//         case 'otf': return 'opentype'
//     }
// }

// function embedInDOM(content) {
//     const style = document.createElement('style')
//     style.id = 'bncringfonts'
//     style.textContent = content
//     document.head.appendChild(style)
// }

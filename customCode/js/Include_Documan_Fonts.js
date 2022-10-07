const fonts = [
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe5130170-bbdc-11ec-bad1-9571bd3ac110_Documan-Regular.woff2?alt=media&token=a3f94ae5-7af1-4a78-a843-5491dff7046b',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe47cb4e0-bbdc-11ec-bad1-9571bd3ac110_Documan-Regular.woff?alt=media&token=3fc44624-db97-4983-8074-13eb82b41a37',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fd97c8b60-bbdc-11ec-bad1-9571bd3ac110_Documan-Regular.ttf?alt=media&token=130dd3f6-235e-4c04-91b4-04a0f626eb1c',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fccfc78a0-bbdc-11ec-bad1-9571bd3ac110_Documan-Regular.otf?alt=media&token=e501dfd5-ded3-4055-a671-bb11a33df288',
        ],
        weight: 400
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe3f27640-bbdc-11ec-bad1-9571bd3ac110_Documan-Medium.woff2?alt=media&token=9a6307a9-4adf-4e4f-a8cc-c0cd9fca642a',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe35d1410-bbdc-11ec-bad1-9571bd3ac110_Documan-Medium.woff?alt=media&token=7fd36223-5788-4ce3-943e-9ca70a8abfaf',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fd83abc90-bbdc-11ec-bad1-9571bd3ac110_Documan-Medium.ttf?alt=media&token=62176259-b006-4df3-9b80-cf712907c242',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fcba3c670-bbdc-11ec-bad1-9571bd3ac110_Documan-Medium.otf?alt=media&token=4c4b0556-d90b-454f-9aec-fa7f823cfaf0',
        ],
        weight: 500
    },
    {
        urls: [
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe2db60f0-bbdc-11ec-bad1-9571bd3ac110_Documan-Bold.woff2?alt=media&token=b68fbca9-5dff-40b4-a6c6-ea984c87e222',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fe25bd0b0-bbdc-11ec-bad1-9571bd3ac110_Documan-Bold.woff?alt=media&token=c92b0992-d4db-4ab9-9ac5-e8af37ccfce3',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fd6e00e90-bbdc-11ec-bad1-9571bd3ac110_Documan-Bold.ttf?alt=media&token=0aba82ed-1bc6-4162-b23d-ddbeff4b97c1',
            'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-MuQh4Zl5IM3cOTGslkd%2Fca37da60-bbdc-11ec-bad1-9571bd3ac110_Documan-Bold.otf?alt=media&token=6f624ba3-d82a-439f-b44e-1697b718fd4f',
        ],
        weight: 700
    }
]

if (!document.getElementById('documanFonts')) {
    let includeText = ''

    for (let font of fonts) {
        let fontFace = `
@font-face {
font-family: "Documan";
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
        style.id = 'documanFonts'
        style.textContent = content
        document.head.appendChild(style)
    }
}


// const fonts = $dataGrid('extensions')['-N-ba4bEadmSDm6DLv4X'].files
// const urls = []
// const queue = []

// if (fonts && !document.getElementById('documanFonts')) {
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
//     if (document.getElementById('documanFonts')) return

//     let includeText = `
// @font-face {
// font-family: "Documan";
// src:
//     `

//     for (let fontUrl of urls) {
//         includeText += `\n\r  url("${fontUrl}") format("${getFontFormat(fontUrl)}"),`
//     }

//     includeText = includeText.slice(0, -1)
//     includeText += ';\n\r}'

//     embedInDOM(includeText)
// })

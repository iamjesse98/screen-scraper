const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const Tesseract = require('tesseract.js')

const {
    focusWindow
} = require('node-process-windows')

const {
    typeString,
    keyTap,
    setKeyboardDelay,
    keyToggle
} = require('robotjs')

function selectAndDo(name, job) {
    focusWindow(name)
    setTimeout(_ => job(), 250)
    // job()
}

const [x, y, w, h] = [6, 91, 88, 25]

const job = _ => new Promise(async (resolve, reject) => {
    const buffer = await screenshot() // whole desktop screenshot
    const image = await Jimp.read(buffer) // whole image
    image.crop(x, y, w, h) // clipped image
            .getBuffer('image/png', (err, buff) =>
                                                Tesseract.recognize(buff, {
                                                    lang: 'eng'
                                                }).then(res => resolve(res.text.replace(/\n/g, ''))))})

setInterval( _ => job().then(d => {
    console.log(d)
    selectAndDo('stock - Notepad', _ => {
        typeString(d)
        keyTap('enter')
        // keyTap('s', ['control'])
        // // keyTap('left')
        // typeString('robot.txt')
        // keyTap('enter')
    })
}), 500)
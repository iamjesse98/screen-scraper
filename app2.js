const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const Tesseract = require('tesseract.js')

const target = process.argv[2]
console.log(target)

const [x, y, w, h] = [9, 113, 277 - 9, 554 - 113]

// const job = _ => new Promise(async (resolve, reject) => {
//     const buffer = await screenshot() // whole desktop screenshot
//     const image = await Jimp.read(buffer) // whole image
//     image.crop(x, y, w, h) // clipped image
//             .getBuffer('image/png', (err, buff) =>
//                                                 Tesseract.recognize(buff, {
//                                                     lang: 'eng'
//                                                 }).then(res => resolve(res.text.split('\n').filter(_ => _ !== '').map(e => {
//                                                     const [ name, value ] = e.split('Rs. ')
//                                                     return { name, value }
//                                                 }).filter(e => e.name.replace(/\s/g, '') === target)[0])))})

const job = _ => new Promise(async (resolve, reject) => {
    const buffer = await screenshot() // whole desktop screenshot
    const image = await Jimp.read(buffer) // whole image
    image.crop(x, y, w, h) // clipped image
        .getBuffer('image/png', (err, buff) =>
            Tesseract.recognize(buff, {
                lang: 'eng'
            }).then(res => resolve(res.text.split('\n').filter(_ => _ !== ''))))
})

setInterval( _ => job().then(d => console.log(d)), 700)
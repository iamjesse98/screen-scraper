const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const Tesseract = require('tesseract.js')

const target = process.argv[2]
console.log(target)

const [xi, yi, wd, ht, pad] = [15, 166, 254, 24, 64]

const job = (x, y, w, h) => new Promise(async (resolve, reject) => {
    const buffer = await screenshot() // whole desktop screenshot
    const image = await Jimp.read(buffer) // whole image
    image.crop(x, y, w, h) // clipped image
        .getBuffer('image/png', (err, buff) =>
            Tesseract.recognize(buff, {
                lang: 'eng'
            }).then(res => {
                const [name, value] = res.text.replace(/\n/g, '').split('Rs. ')
                resolve({
                    name,
                    value
                })
                // resolve(name === target ? value : false)
            }))
})

setInterval(_ => job(xi, yi, wd, ht).then(d => console.log(1, d)), 500)
setInterval(_ => job(xi, yi + ht + pad, wd, ht).then(d => console.log(2, d)), 500)
// setInterval(_ => job(xi, yi + (2 * (ht + pad)), wd, ht).then(d => console.log(3, d)), 500)
// setInterval(_ => job(xi, yi + (3 * (ht + pad)), wd, ht).then(d => console.log(4, d)), 500)
// setInterval(_ => job(xi, yi + (4 * (ht + pad)), wd, ht).then(d => console.log(5, d)), 500)
const screenshot = require('screenshot-desktop')
const Jimp = require('jimp')
const Tesseract = require('tesseract.js')

const target = process.argv[2]
console.log(target)

const [xi, yi, wd, ht, pad] = [15, 166, 254, 24, 64]

const getText = img => new Promise(async (resolve, reject) => img.getBuffer('image/png', (err, buff) =>
    Tesseract.recognize(buff, {
        lang: 'eng'
    }).then(res => {
        const [name, value] = res.text.replace(/\n/g, '').split('Rs. ')
        resolve({
            name,
            value
        })
        // resolve(name === target ? value : false)
    })))

const job = _ =>
        screenshot().then(buffer => Jimp.read(buffer).then(image => {
        // const [img1, img2, img3, img4, img5] = [image.crop(xi, yi, wd, ht), image.crop(xi, yi + ht + pad, wd, ht), image.crop(xi, yi + (2 * (ht + pad)), wd, ht), image.crop(xi, yi + (3 * (ht + pad)), wd, ht), image.crop(xi, yi + (4 * (pad + ht)), wd, ht)]
        
        // img1.write('img1.jpg')
        // img2.write('img2.jpg')
        // img3.write('img3.jpg')
        // img4.write('img4.jpg')
        // img5.write('img5.jpg')

        image.crop(xi, yi, wd, ht).write('img1.jpg')
        image.crop(xi, yi + ht + pad, wd, ht).write('img2.jpg')
        image.crop(xi, yi + (2 * (ht + pad)), wd, ht).write('img3.jpg')
        image.crop(xi, yi + (3 * (ht + pad)), wd, ht).write('img4.jpg')
        image.crop(xi, yi + (4 * (ht + pad)), wd, ht).write('img5.jpg')

        // setInterval(getText(img1).then(d => console.log(1, d)), 500)
        // setInterval(getText(img2).then(d => console.log(2, d)), 500)
        // setInterval(getText(img3).then(d => console.log(3, d)), 500)
        // setInterval(getText(img4).then(d => console.log(4, d)), 500)
        // setInterval(getText(img5).then(d => console.log(5, d)), 500)

        // getText(img1).then(d => console.log(1, d))
        // getText(img2).then(d => console.log(2, d))
        // getText(img3).then(d => console.log(3, d))
        // getText(img4).then(d => console.log(4, d))
        // getText(img5).then(d => console.log(5, d))
    }))

job()
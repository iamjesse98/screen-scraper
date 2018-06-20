const [xi, yi, wd, ht, pad] = [15, 166, 254, 24, 64]

console.log(xi, yi                   , wd, ht)
console.log(xi, yi +       ht +   pad, wd, ht)
console.log(xi, yi + (2 * (ht + pad)), wd, ht)
console.log(xi, yi + (3 * (ht + pad)), wd, ht)
console.log(xi, yi + (4 * (pad + ht)), wd, ht)
const { typeString, keyTap, setKeyboardDelay } = require('robotjs')

setKeyboardDelay(1000)
typeString('Hello World!!!')
keyTap('enter')
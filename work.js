const { focusWindow } = require('node-process-windows')

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

// focusWindow('Untitled - Notepad')

    // typeString('Hello World!!!')
    // keyTap('enter')

selectAndDo('Untitled - Notepad', _ => {
    typeString('Hello World!!!')
    keyTap('enter')
    keyTap('s', ['control'])
    // keyTap('left')
    typeString('robot.txt')
    keyTap('enter')
})
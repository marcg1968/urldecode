

const readline = require('readline')
const { exec, spawn } = require('child_process')
const os = require('os')

const isMacOS = () => os.platform() === 'darwin'

// const pbcopyBinary = isMacOS() ? 'pbcopy' : '/usr/bin/xclip -selection clipboard'

const pbcopy = (data = '') => {
    let proc
    if (isMacOS()) {
        proc = require('child_process').spawn(pbcopyBinary)
        proc.stdin.write(data)
        proc.stdin.end()
        return
    }
    // const proc = require('child_process').spawn('pbcopy')
    proc = spawn('xclip', ['-selection', 'clipboard'], {
        detached: true, // Allows the child process to run independently of the parent
        stdio: ['pipe', 'ignore', 'ignore'] // Pipe stdin, ignore stdout and stderr
    })
    proc.stdin.end(data)
    // Unreference the child process to allow the Node.js script to exit normally
    return proc.unref()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let count = 0,
    prompt = 'ENTER: '

// macOS function to copy to clipboard
const openInBrowser = url => `open -a "Google Chrome" ${url}`

rl.prompt()

rl.on('line', input => {
    if (input.toLowerCase().trim() === 'q') {
        return rl.close()
    }
    // console.zlog(++count, input.trim())
    const r = input.match(/url\=([^\&]+)/)
    const url = decodeURIComponent(r[1])
    // exec(openInBrowser(url))
    console.log(url)
    pbcopy(url)
    rl.prompt()
})

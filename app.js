

const readline = require('readline')
const { exec } = require('child_process')

const pbcopy = data => {
    const proc = require('child_process').spawn('pbcopy')
    proc.stdin.write(data)
    proc.stdin.end()
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

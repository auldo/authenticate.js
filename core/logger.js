const fs = require('fs')
const logDirectory = '/logs'

if(!fs.existsSync(logDirectory))
    fs.mkdirSync(logDirectory)

function log(message){
    const log = String(Date.now()) + "\n" + message + "\n\n\n";
    const file = logDirectory + getFileName()
    if(fs.existsSync(file)){
        fs.appendFileSync(file, log)
    } else {
        const writer = fs.openSync(file, 'w')
        fs.writeSync(writer, log)
    }
}

function getFileName(){
    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    return "/" + day + "" + month + "" + year + ".log"
}

module.exports = log
const mongoose = require('mongoose')

/**
 * Provides database connection.
 * @returns {Promise<void>} A promise, that resolves in the database connection.
 */

let uri;
if(!process.env.DB_USER && !process.env.DB_PW){
    uri = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT
} else {
    uri = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PW + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT
}
console.log(uri)

async function connect(){
    await mongoose.connect(uri)
}

module.exports = connect
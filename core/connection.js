const mongoose = require('mongoose')

/**
 * Provides database connection.
 * @returns {Promise<void>} A promise, that resolves in the database connection.
 */

//mongodb://root:7pL25uWZcjDJ@bcimongodb:27017/
const uri = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PW + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT

async function connect(){
    await mongoose.connect(uri)
}

module.exports = connect
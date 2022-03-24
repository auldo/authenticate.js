const mongoose = require('mongoose')

/**
 * The mongodb schema for a user authentication entity.
 * @type {Schema} The user schema.
 */
const userSchema = new mongoose.Schema({
    identity: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    }
})

/**
 * The model of the authentication user schema.
 */
const User = mongoose.model('User', userSchema)

module.exports = User
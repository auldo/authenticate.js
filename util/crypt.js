const bcrypt = require("bcrypt");

/**
 * Encrypts a password and returns hash.
 * @param password The password to hash.
 * @returns {Promise<*>} A promise containing the hash, when resolved.
 */
async function encrypt(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

/**
 * Verifies a password by comparing it with its hash.
 * @param password The password.
 * @param hash The hash.
 * @returns {Promise<number>} A promise containing a boolean.
 */
async function verify(password, hash){
    return await bcrypt.compare(password, hash)
}

module.exports = {
    encrypt: encrypt,
    verify: verify
}
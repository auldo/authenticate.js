/**
 * Provides methods for checking authentication state of requests, as well as for signing new keys.
 */

const jwt = require('jsonwebtoken')
const constants = require('./constants')
const User = require('../model/User')

/**
 * Signs a key and returns it.
 * @param payload The data contained in the key.
 * @returns {*} The signed key.
 */
const sign = (payload) => {
    return jwt.sign(payload, constants.authKey)
}

/**
 * Checks, if an HTTP-Request is authenticated or not.
 * @param request The HTTP-Request.
 * @param response The HTTP-Response to fire unauthorized errors.
 * @returns {Promise<unknown>} A Promise, which is always resolving with the user object. Catching is not necessary, as the method then responses the HTTP-Request with an Unauthorized-Error.
 */
const authenticate = function(request, response){
    return new Promise(function(resolve){
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, constants.authKey, async function(error, payload){
                if (error) {
                    response.status(400).json({
                        error: "Authentication failed."
                    })
                } else {
                    const user = await User.findOne({_id: payload.id})
                    if(user)
                        resolve(user);
                    else {
                        response.status(400).json({
                            error: "The requesting user does not exist anymore."
                        })
                    }
                }
            });
        } else {
            response.status(400).json({
                error: "Make sure to provide a bearer token to authenticate."
            })
        }
    })
};

module.exports = {
    authenticate: authenticate,
    sign: sign
};
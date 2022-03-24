const {authenticate} = require("./authenticate")
const { validationResult } = require('express-validator')

/**
 * Validates if a request is ok, by checking authentication and arguments.
 * @param request The HTTP-Request object.
 * @param response The HTTP-Response object, to fire bad status if problems occur.
 * @param authentication A bool, if authentication should be checked via {@link authenticate}.
 * @returns {Promise<unknown>} Resolves, if request is ok.
 */
function validateRoute(request, response, authentication){
    return new Promise(function(resolve){
        if(authentication){
            authenticate(request, response).then(function(user){
                let errors = validationResult(request)
                if(errors.isEmpty()){
                    resolve(user)
                } else {
                    response.status(404).json({
                        error: "Bad arguments provided."
                    })
                }
            })
        } else {
            let errors = validationResult(request)
            if(errors.isEmpty()){
                resolve()
            } else {
                response.status(404).json({
                    error: "Bad arguments provided."
                })
            }
        }
    })
}

module.exports = validateRoute
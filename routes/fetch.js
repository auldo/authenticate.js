const express = require('express')
const validateRoute = require('../util/validate')
const {sign} = require("../util/authenticate");

const router = express.Router()

router.post(
    '/authenticate',
    function(request, response){
        validateRoute(request, response, true).then(function(user){
            const data = {
                token: sign({id: user._id}),
                user: {
                    _id: user._id,
                    identity: user.identity
                }
            }
            response.status(200).json({
                message: "Successfully authenticated.",
                data: data
            })
        })
    }
)

module.exports = router
const express = require('express')
const { check } = require('express-validator')
const validateRoute = require('../util/validate')
const User = require("../model/User");
const {verify} = require("../util/crypt");
const {sign} = require("../util/authenticate");

const router = express.Router()

router.post(
    '/login',
    [
        check('identity').isEmail(),
        check('password').isString()
    ],
    function(request, response){
        validateRoute(request, response, false).then(async function(){
            const user = await User.findOne({identity: request.body.identity})
            if(user){
                const correct = await verify(request.body.password, user.hash)
                if(correct){
                    const data = {
                        token: sign({id: user._id}),
                        user: {
                            _id: user._id,
                            identity: user.identity
                        }
                    }
                    response.status(200).json({
                        message: "Successfully logged in.",
                        data: data
                    })
                } else {
                    response.status(500).json({
                        error: "Bad Password."
                    })
                }
            } else {
                response.status(500).json({
                    error: "Bad identity."
                })
            }
        })
    }
)

module.exports = router
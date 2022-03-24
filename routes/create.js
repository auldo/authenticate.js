const express = require('express')
const { check } = require('express-validator')
const logger = require('../core/logger')
const User = require("../model/User");
const {encrypt} = require("../util/crypt");
const validateRoute = require('../util/validate')

const router = express.Router()

router.post(
    '/',
    [
        check('identity').isEmail(),
        check('password').isString()
    ],
    function(request, response){
        validateRoute(request, response, false).then(async function(){
            const user = new User()
            user.identity = request.body.identity
            user.hash = await encrypt(request.body.password)
            user.save().then(function(){
                response.status(200).json({
                    error: "Successfully created user."
                })
            }).catch(function(e){
                logger(e)
                response.status(500).json({
                    error: "Could not create user due to internal server error."
                })
            })
        })
    }
)

module.exports = router
const express = require('express')
const { check } = require('express-validator')
const validateRoute = require('../util/validate')
const log = require('../core/logger')
const {verify} = require("../util/crypt");
const User = require("../model/User");

const router = express.Router()

router.delete(
    '/',
    check('password').isString(),
    function(request, response) {
        validateRoute(request, response, true).then(async function(user){
            const correct = await verify(request.body.password, user.hash)
            if(correct){
                User.deleteOne({_id: user._id}).then(function(){
                    response.status(200).json({
                        message: "Successfully removed user."
                    })
                }).catch(function(e){
                    log(e)
                    response.status(500).json({
                        error: "Could not remove user due to internal server error."
                    })
                })
            } else {
                response.status(500).json({
                    error: "Could not remove user due to bad password."
                })
            }
        })
    }
)

module.exports = router
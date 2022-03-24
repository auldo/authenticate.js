const express = require('express')
const validateRoute = require('../util/validate')
const log = require('../core/logger')
const {encrypt, verify} = require("../util/crypt");
const User = require("../model/User");

const router = express.Router()

router.put(
    '/',
    function(request, response){
        validateRoute(request, response, true).then(async function(user){

            const data = {}

            if(request.body.oldPassword && request.body.newPassword){
                const correct = await verify(request.body.oldPassword, user.hash)
                if(correct)
                    data.hash = await encrypt(request.body.newPassword)
                else
                    return response.status(500).json({
                        error: "Could not update user due to bad password."
                    })
            } else if(request.body.identity){
                const users = User.find({identity: request.body.identity})
                if(users.length === 0)
                    data.identity = request.body.identity
            }

            User.updateOne({_id: user._id}, data).then(async function(){
                response.status(200).json({
                    error: "Successfully updated user.",
                    data: data
                })
            }).catch(function(e){
                log(e)
                response.status(500).json({
                    error: "Could not update user due to internal server error."
                })
            })
        })
    }
)

module.exports = router
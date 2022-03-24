const express = require('express')
const cookieParser = require('cookie-parser')
const connect = require('./connection')
const log = require("./logger");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

/**
 * Middleware to pre-check requests' validity.
 */
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', "true")
    next()
});

/**
 * Connects to the database on server start to output connection state on the console.
 */
connect().then(function(){
    console.log("Connected to DB.")
}).catch(function(e){
    log((typeof e === "string" || e instanceof String) ? e : JSON.stringify(e))
    console.log("Couldn't connect to DB.")
})

/**
 * Creates new user, if possible (if identity does not already exist).
 */
const userCreateRouter = require('../routes/create')
app.use('/', userCreateRouter)

/**
 * Tries to log in a combination of identity and password. Returns token, if success.
 */
const userLoginRouter = require('../routes/login')
app.use('/', userLoginRouter)

/**
 * Checks if user is authenticated and returns user and a new token if so.
 */
const userAuthenticateRouter = require('../routes/fetch')
app.use('/', userAuthenticateRouter)

/**
 * Updates user (password or identity), if requester is authenticated.
 */
const userUpdateRouter = require('../routes/update')
app.use('/', userUpdateRouter)

/**
 * Removes user, if requester is authenticated.
 */
const userDeleteRouter = require('../routes/delete')
app.use('/', userDeleteRouter)

module.exports = app
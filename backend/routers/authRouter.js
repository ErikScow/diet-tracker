const express = require('express')
const authRouter = express.Router()

authRouter.post('/login', (req, res) => {
    //logs in the user
})

authRouter.post('/register', (req, res) => {
    //creates new user account
})

module.exports = authRouter
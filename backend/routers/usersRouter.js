const { Router } = require('express')
const express = require('express')
const userRouter = express.Router()

const dailyDataRouter = require('./dailyDataRouter')

userRouter.use('/:id/daily', dailyDataRouter)

userRouter.put('/:id', (req, res) => {
    //updates user info
})

userRouter.delete('/:id', (req, res) => {
    //deletes user
})

module.exports = userRouter
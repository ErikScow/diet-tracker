const express = require('express')

const users = require('../models/usersModel')

const dailyDataRouter = require('./dailyDataRouter')

const userRouter = express.Router()

userRouter.use('/daily', dailyDataRouter)

userRouter.put('/', async (req, res) => {
    const changes = req.body
    const id = req.user.id

    try {
        const updated = await users.update(changes, id)
        res.status(200).json({ updated: updated })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "server could not update" })
    }
})

userRouter.delete('/', async (req, res) => {
    const id = req.user.id

    try{
        const deleted = await users.remove(id)
        res.status(200).json({ message: 'delete was successful' })
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'server could not delete'})
    }
})

module.exports = userRouter
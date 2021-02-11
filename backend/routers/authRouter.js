const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = require('../models/usersModel')
const secrets = require('../config/secrets')

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    console.log('made it here')

    const newUserInfo = req.body

    hash = bcrypt.hashSync(newUserInfo.password, 12)
    newUserInfo.password = hash

    try {
        const newUser = await users.register(newUserInfo)
        res.status(201).json(newUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'could not create user'})
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await users.findByEmail(email)
        if (user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            res.status(200).json({ 
                message: ` ${user.name} logged in`, 
                token: token
            })
        } else {
            res.status(400).json({ message: 'invalid email or password' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'could not login to database' })
    }
})

function generateToken(user){
    const payload = {
        userId: user.id
    }
    const options = {
        expiresIn: '7d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = authRouter
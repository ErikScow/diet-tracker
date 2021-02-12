const users = require('../models/usersModel')

const validateUser = (req, res, next) => {
    const {name, email, password, manual_mode, birth_date, weight, gender} = req.body

    if (name, email, password, manual_mode, birth_date, weight, gender){
        next()
    } else {
        res.status(400).json({ message: 'missing required fields' })
    }
    
}

const uniqueEmail = async (req, res, next) => {
    const { email } = req.body

    try {
        const emailInUse = await users.findByEmail(email)
        if (emailInUse){
            res.status(400).json({ message: "email in use" })
        } else {
            next()
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database to validate" })
    }
    
}

const validateUserId = async (req, res, next) => {
    const id = req.params.id

    try {
        const user = await users.findById(id)
        if (user){
            req.user = user
            next()
        } else {
            res.status(400).json({ message: "id does not exist" })
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database to validate" })
    }
}

module.exports = {
    validateUser,
    uniqueEmail,
    validateUserId
}
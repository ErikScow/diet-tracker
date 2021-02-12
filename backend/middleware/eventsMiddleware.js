const events = require('../models/eventModel')



const validateEventId = async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const isValid = await events.findById(id)
        if (isValid){
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
    validateEventId
}
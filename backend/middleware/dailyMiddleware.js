const daily = require('../models/dailyModel')

const validateDate = async (req, res, next) => {
    const date = req.params.date
    const userId = req.user.id
    try {
        const day = await daily.findByDate(date, userId)
        if (day){
            req.dateId = day.id
            next()
        } else {
            res.status(420).json({ message: "date does not exist" })
        }
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database to validate" })
    }
}

module.exports = {
    validateDate
}
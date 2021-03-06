const express = require('express')

const dailyData = require('../models/dailyModel')

const { validateDate } = require('../middleware/dailyMiddleware')

const dailyDataRouter = express.Router()

const calorieEventRouter = require('./calorieEventRouter')
dailyDataRouter.use('/:date/events', validateDate, calorieEventRouter)

dailyDataRouter.get('/', async (req, res) => {
    const userId = req.user.id

    try {
        const allDailyData = await dailyData.findAllByUser(userId)
        res.status(200).json(allDailyData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database for data" })
    }
})

dailyDataRouter.get('/:date', validateDate, async (req, res) => {
    const userId = req.user.id
    const date = req.params.date

    try {
        const todaysData = await dailyData.findByDate(date, userId)
        res.status(200).json(todaysData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database for data" })
    }
})

dailyDataRouter.post('/', async (req, res) => {
    const dayInfo = req.body

    try {
        const newDaysData = await dailyData.add(dayInfo)
        res.status(201).json(newDaysData)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not add data" })
    }
})

dailyDataRouter.put('/:date', validateDate, async (req, res) => {
    const changes = req.body
    const userId = req.user.id
    
    try {
        const updated = await dailyData.update(changes, userId)
        res.status(200).json({message: "updated successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not update data" })
    }
})

module.exports = dailyDataRouter
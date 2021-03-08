const express = require('express')

const events = require('../models/eventModel')

const { validateEventId } = require('../middleware/eventsMiddleware')

const calorieEventRouter = express.Router()

calorieEventRouter.get('/', async (req, res) => {
    const dayId = req.dateId

    try {
        const daysEvents = await events.findAllByDay(dayId)
        res.status(200).json(daysEvents)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not check database for data" })
    }
})
calorieEventRouter.post('/', async (req, res) => {
    const dayId = req.dateId
    const eventInfo = req.body
    eventInfo.day_id = dayId

    try {
        const newEvent = await events.add(eventInfo)
        res.status(201).json(newEvent)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not post to database" })
    }
})
calorieEventRouter.delete('/:id', validateEventId, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const deleted = await events.remove(id)
        res.status(200).json({ message: "successfully deleted event" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "could not remove from database" })
    }
})

module.exports = calorieEventRouter
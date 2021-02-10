const express = require('express')
const dailyDataRouter = express.Router()

const calorieEventRouter = require('./calorieEventRouter')

dailyDataRouter.use('/:date/events', calorieEventRouter)

dailyDataRouter.get('/', (req, res) => {
    //returns all historical for user
})

dailyDataRouter.get('/:date', (req, res) => {
    //returns this day's data
    //if returns an error, this error is handled on the fe to do a post for this day
})

dailyDataRouter.post('/:date', (req, res) => {
    //creates new day data point and returns that day
})

dailyDataRouter.put('/:date', (req, res) => {
    //updated day's data
})

module.exports = dailyDataRouter
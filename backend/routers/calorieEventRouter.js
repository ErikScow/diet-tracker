const express = require('express')
const calorieEventRouter = express.Router()

calorieEventRouter.get('/', (req, res) => {
    //returns all calorie events for specified day
})
calorieEventRouter.post('/', (req, res) => {
    //creates new calorie event for day
})
calorieEventRouter.delete('/:id', (req, res) => {
    //deletes the specified calorie event
})

module.exports = calorieEventRouter
import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import { formattedDate } from '../utils/dateFormatting'

export const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState: {
        calorieEventsLoading: false,
        calorieEvents: []
    },
    reducers: {
        updateCalorieEventsLoading: (state) => {
            if (state.calorieEventsLoading) {
                state.calorieEventsLoading = false
            } else {
                state.calorieEventsLoading =  true
            }
        },
        updateCalorieEvents: (state, action) => {
            state.calorieEvents = action.payload
        },
        addCalorieEvent: (state, action) => {
            state.calorieEvents = [...state.calorieEvents, ...action.payload]
        },
        clearEvents: (state) => {
            state.calorie_events = []
        }
    }
})

// destructure the reducer funtions listed above here to be exported
export const {
    updateCalorieEventsLoading, 
    updateCalorieEvents,
    addCalorieEvent,
    clearEvents
} = eventsSlice.actions

export const getCalorieEventsCall = (userId, formattedDate) => dispatch =>{
    apiCalls.getCalorieEvents(userId, formattedDate)
        .then(res => {
            dispatch(updateCalorieEvents(res.data))
        })
        .catch(err => {
        })
}

export const addCalorieEventCall = (userId, formattedDate, newEvent) => dispatch => {
    apiCalls.addCalorieEvent(userId, formattedDate, newEvent)
        .then(res => {
            dispatch(getCalorieEventsCall(userId, formattedDate))
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteCalorieEventCall = (userId, formattedDate, eventId) => dispatch => {
    apiCalls.deleteCalorieEvent(userId, formattedDate, eventId)
        .then(res => {
            dispatch(clearEvents())
            dispatch(getCalorieEventsCall(userId, formattedDate))
        })
        .catch(err => {
            console.log(err)
        })
}



export default eventsSlice.reducer
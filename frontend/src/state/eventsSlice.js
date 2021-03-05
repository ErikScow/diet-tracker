import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import formattedDate from '../utils/dateFormatting'

export const eventsSlice = createSlice({
    name: 'eventsSlice',
    initialState: {
        calorieEventsLoading: false,
        calorieEvents: []
    },
    reducers: {
        updateCalorieEvensLoading: (state) => {
            if (state.calorieEventsLoading) {
                state.calorieEventsLoading = false
            } else {
                state.calorieEventsLoading =  true
            }
        },
        updateCalorieEvents: (state, action) => {
            state.calorie_events = [...state.calorieEvents, ...action.payload]
        }
    }
})

// destructure the reducer funtions listed above here to be exported
export const {
} = eventsSlice.actions




export default eventsSlice.reducer
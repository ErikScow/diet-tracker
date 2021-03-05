import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import formattedDate from '../utils/dateFormatting'

export const dailySlice = createSlice({
    name: 'dailySlice',
    initialState: {

        formattedDate: '',

        dailyInfoLoading: false,
        dailyInfo: {
            calorie_total: '',
            bmr: '',
            calorie_suggestion: '',
        },
    },
    reducers: {

        updateFormattedDate: (state, action) => {
            state.formattedDate = action.payload
        },

        updateDailyInfoLoading: (state) => {
            if (state.dailyInfoLoading) {
                state.dailyInfoLoading = false
            } else {
                state.dailyInfoLoading =  true
            }
        },
        updateDailyInfo: (state, action) => {
            state.dailyInfo = {...state.dailyInfo, ...action.payload}
        },
    }
})

// destructure the reducer funtions listed above here to be exported
export const {
    updateFormattedDate,
} = dailySlice.actions



export const asyncUpdateFormattedDate = (formattedDate) => dispatch => {
    dispatch(updateFormattedDate(formattedDate))
}



export default dailySlice.reducer
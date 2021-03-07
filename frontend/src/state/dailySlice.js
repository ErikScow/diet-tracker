import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import formattedDate from '../utils/dateFormatting'

export const dailySlice = createSlice({
    name: 'dailySlice',
    initialState: {
        formattedDate: '',

        dailyInfoLoading: false,
        updateInfoLoading: false,
        allDailyLoading: false,
        dailyInfo: {
            calorie_total: '',
            bmr: '',
            calorie_suggestion: '',
            weight: '',
            positive: true
        },
        allDailyInfo: []
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
        updateUpdateInfoLoading: (state) => {
            if (state.updateInfoLoading) {
                state.updateInfoLoading = false
            } else {
                state.updateInfoLoading =  true
            }
        },
        updateAllDailyInfoLoading: (state) => {
            if (state.allDailyInfoLoading) {
                state.allDailyInfoLoading = false
            } else {
                state.allDailyInfoLoading =  true
            }
        },
        updateDailyInfo: (state, action) => {
            state.dailyInfo = {...state.dailyInfo, ...action.payload}
        },
        updateAllDailyInfo: (state, action) => {
            state.allDailyInfo = [...state.dailyInfo, ...action.payload]
        }
    }
})

export const {
    updateFormattedDate,
    updateDailyInfoLoading,
    updateUpdateInfoLoading,
    updateAllDailyInfoLoading,
    updateDailyInfo,
    updateAllDailyInfo
} = dailySlice.actions

export const getAllDailyDataCall = (userId, onSuccess, onFailure) => dispatch => {
    dispatch(updateAllDailyInfoLoading())

    apiCalls.getAllDailyData(userId)
        .then(res => {
            dispatch(updateAllDailyInfo(res.data))
        })
        .catch(err => {
            console.log(err)
        })

    dispatch(updateAllDailyInfoLoading())
}

export const getTodayCall = (userId, formattedDate, defaultDayData) => dispatch => {
    dispatch(updateDailyInfoLoading())

    apiCalls.getToday(userId, formattedDate)
        .then(res => {
            dispatch(updateDailyInfo(res.data))
        })
        .catch(err => {
            if (err.response.status === 420){
                dispatch(createDayCall(userId, defaultDayData))
            } else {
                console.log(err)
            }
            
        })

    dispatch(updateDailyInfoLoading())
}

export const createDayCall = (userId, dayData) => dispatch => {
    apiCalls.createDay(userId, dayData)
        .then(res => {
            dispatch(updateDailyInfo(res.data))
        })
        .catch(err => {
            console.log(err)
        })
}

export const updateDayCall = (userId, formattedDate, updateInfo) => dispatch => {
    dispatch(updateUpdateInfoLoading())

    apiCalls.updateDay(userId, formattedDate, updateInfo)
        .then(res => {
            dispatch(updateDailyInfo(updateInfo))
        })
        .catch(err => {
            console.log(err)
        })

    dispatch(updateUpdateInfoLoading())
}

export default dailySlice.reducer
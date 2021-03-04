import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'slice',
    initialState: {
        id: '',
        authenticated: false,

        formattedDate: '',

        userInfo: {
            weight: '',
            activity_level: '',
            desired_loss_rate: '',
            gender: '',
            birth_date: '',
            age: '',
        },

        dailyInfo: {
            calorie_total: '',
            bmr: '',
            calorie_suggestion: '',
        },
        
        calorie_events: []
    },
    reducers: {
        updateUserId: (state, action) => {
            state.id = action.payload
        },
        authenticate: (state) => {
            state.authenticated = true
        },
        deAuthenticate: (state) => {
            state.authenticated = false
        },
        updateFormattedDate: (state, action) => {
            state.formattedDate = action.payload
        },

        updateUserInfo: (state, action) => {
            state.userInfo = {...state.userInfo, ...action.payload}
        },

        updateDailyInfo: (state, action) => {
            state.dailyInfo = {...state.dailyInfo, ...action.payload}
        },

        updateCalorieEvents: (state, action) => {
            state.calorie_events = [...state.calorie_events, ...action.payload]
        }
    }
})

// destructure the reducer funtions listed above here to be exported
export const { 
    updateUserId, 
    authenticate, 
    deAuthenticate,
    updateFormattedDate,
    
    updateUserInfo,
    updateDailyInfo,
    updateCalorieEvents,

} = slice.actions

export const asyncUpdateUserId = (id) => dispatch => {
    dispatch(updateUserId(id))
}

export const asyncUpdateFormattedDate = (formattedDate) => dispatch => {
    dispatch(updateFormattedDate(formattedDate))
}

export const asyncUpdateUserInfo = (updateInfo) => dispatch => {
    dispatch(updateUserInfo(updateInfo))
}

export const aysncUpdateDailyInfo = (updateInfo) => dispatch => {
    dispatch(updateDailyInfo(updateInfo))
}

export const asyncUpdateCalorieEvents = (updateInfo) => dispatch => {
    dispatch(updateCalorieEvents(updateInfo))
}

export default slice.reducer
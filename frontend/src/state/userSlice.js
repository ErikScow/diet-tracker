import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import { calculateBmr } from '../utils/calorieCalculations';
import { formattedDate } from '../utils/dateFormatting'
import { updateDayCall } from './dailySlice';

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        authenticated: false,
        loginLoading: false,
        registerLoading: false,
        authCheckLoading: false,
        userUpdateLoading: false,
        userInfo: {
            id: '',
            weight: '',
            height: '',
            activity_level: '',
            desired_loss_rate: '',
            gender: '',
            birth_date: '',
            age: '',
        },
        apiLoginError: null,
        apiRegisterError: null,
        apiUserUpdateError: null,
    },
    reducers: {
        authenticate: (state) => {state.authenticated = true},
        deAuthenticate: (state) => {state.authenticated = false},
        updateLoginLoading: (state) => {
            if (state.userLoading) {
                state.userLoading = false
            } else {
                state.userLoading =  true
            }
        },
        updateRegisterLoading: (state) => {
            if (state.registerLoading) {
                state.registerLoading = false
            } else {
                state.registerLoading =  true
            }
        },
        updateAuthCheckLoading: (state) => {
            if (state.authCheckLoading) {
                state.authCheckLoading = false
            } else {
                state.authCheckLoading =  true
            }
        },
        updateUserUpdateLoading: (state) => {
            if (state.userUpdateLoading) {
                state.userUpdateLoading = false
            } else {
                state.userUpdateLoading =  true
            }
        },
        updateUserInfo: (state, action) => {state.userInfo = {...state.userInfo, ...action.payload}},
        updateApiLoginError: (state, action) => {state.apiLoginError = action.payload},
        updateApiRegisterError: (state, action) => {state.apiRegisterError = action.payload},
        updateUserUpdateError: (state, action) => {state.apiUserUpdateError = action.payload}
    }
})

// destructure the reducer funtions listed above here to be exported
export const { 
    updateLoginLoading,
    updateRegisterLoading,
    updateAuthCheckLoading,
    updateUserUpdateLoading,
    updateUserInfo, 
    authenticate, 
    deAuthenticate,
    updateApiLoginError,
    updateApiRegisterError,
    updateUserUpdateError,
} = userSlice.actions

export const loginCall = (loginCredentials, onSuccess) => dispatch => {
    dispatch(updateLoginLoading())
    
    apiCalls.login(loginCredentials)
        .then( res => {
            //get the date and add user age to the userInfo object
            const date = formattedDate()
            res.data.userInfo.age = parseInt(date.slice(0,4)) - parseInt(res.data.userInfo.birth_date.slice(0,4))
            
            dispatch(updateUserInfo(res.data.userInfo))
            dispatch(updateApiLoginError(null))
            dispatch(authenticate())
            onSuccess(res.data.token)
        })
        .catch( err => {
            dispatch(deAuthenticate())
            if (err.response){
                dispatch(updateApiLoginError(err.response.data.message))
            } else {
                console.log(err)
                dispatch(updateApiLoginError("Network Error"))
            }
        })

    dispatch(updateLoginLoading())
}

export const registerCall = (registerInfo, loginCredentials, onLoginSuccess) => dispatch => {
    dispatch(updateRegisterLoading())

    apiCalls.register(registerInfo)
        .then(res => {
            dispatch(loginCall(loginCredentials, onLoginSuccess))
            dispatch(updateApiRegisterError(null))
        })
        .catch( err => {
            if (err.response){
                dispatch(updateApiRegisterError(err.response.data.message))
            } else {
                console.log(err)
                dispatch(updateApiRegisterError("Network Error"))
            }
        })

    dispatch(updateRegisterLoading())
}

export const checkTokenCall = (userId, onFailure) => dispatch => {
    dispatch(updateAuthCheckLoading())
    
    apiCalls.checkToken(userId)
        .then(res => {
            dispatch(authenticate())
        })
        .catch(err => {
            dispatch(deAuthenticate())
            onFailure()
        })

    dispatch(updateAuthCheckLoading())
}

export const updateUserCall = (userId, updateInfo) => dispatch => {
    dispatch(updateUserUpdateLoading())

    apiCalls.updateUser(userId, updateInfo)
        .then(res => {
            console.log(res)
            dispatch(updateUserInfo(updateInfo))
        })
        .catch(err => {
            console.log(err)
            if (err.response){
                dispatch(updateUserUpdateError(err.response.data.message))
            } else {
                console.log(err)
                dispatch(updateUserUpdateError("Network Error"))
            }
        })

    dispatch(updateUserUpdateLoading())        
}

export default userSlice.reducer
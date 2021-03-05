import { createSlice } from '@reduxjs/toolkit';

import apiCalls from '../api/backendCalls'
import { formattedDate } from '../utils/dateFormatting'

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        authenticated: false,
        loginLoading: false,
        registerLoading: false,
        authCheckLoading: false,
        userInfo: {
            id: '',
            weight: '',
            activity_level: '',
            desired_loss_rate: '',
            gender: '',
            birth_date: '',
            age: '',
        },
        apiLoginError: null,
        apiRegisterError: null,
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
        updateUserInfo: (state, action) => {state.userInfo = {...state.userInfo, ...action.payload}},
        updateApiLoginError: (state, action) => {state.apiLoginError = action.payload},
        updateApiRegisterError: (state, action) => {state.apiRegisterError = action.payload}
    }
})

// destructure the reducer funtions listed above here to be exported
export const { 
    updateLoginLoading,
    updateRegisterLoading,
    updateAuthCheckLoading,
    updateUserInfo, 
    authenticate, 
    deAuthenticate,
    updateApiLoginError,
    updateApiRegisterError,
} = authSlice.actions

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
            console.log(err)
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

export default authSlice.reducer
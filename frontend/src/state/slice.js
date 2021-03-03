import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'slice',
    initialState: {
        id: '',
        authenticated: false
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
        } 
    }
})

// destructure the reducer funtions listed above here to be exported
export const { updateUserId, authenticate, deAuthenticate } = slice.actions

export const asyncUpdateUserId = (id) => dispatch => {
    dispatch(updateUserId(id))
}

export default slice.reducer
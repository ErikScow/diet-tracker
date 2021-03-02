import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'slice',
    initialState: {
        id: ''
    },
    reducers: {
        updateUserId: (state, action) => {
            console.log('made it to reducer', action.payload)
            state.id = action.payload
            console.log(state.id)
        }
    }
})

// destructure the reducer funtions listed above here to be exported
export const { updateUserId } = slice.actions

export const asyncUpdateUserId = (id) => dispatch => {
    dispatch(updateUserId(id))
}

export default slice.reducer
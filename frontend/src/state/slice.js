import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'slice',
    initialState: {
        
    },
    reducers: {
        //all functions to modify global state, named after the action
    }
})

// destructure the reducer funtions listed above here to be exported
export const { } = slice.actions

export const increment
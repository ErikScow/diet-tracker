import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import dailyReducer from './dailySlice'
import eventsReducer from './eventsSlice'

export default configureStore({
  reducer: {
    userSlice: userReducer,
    dailySlice: dailyReducer,
    eventsSlice: eventsReducer
  }
})
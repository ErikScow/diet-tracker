import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    userSlice: userReducer
  }
})
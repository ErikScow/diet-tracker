import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'

import userReducer from './userSlice'
import dailyReducer from './dailySlice'
import eventsReducer from './eventsSlice'

const reducers = combineReducers({
  userSlice: userReducer,
  dailySlice: dailyReducer,
  eventsSlice: eventsReducer
})

const persistConfig = {
  key: 'root',
  storage: storageSession,
  
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})
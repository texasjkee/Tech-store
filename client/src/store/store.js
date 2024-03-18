import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import deviceReducer from './deviceSlice'
import basketReducer from './basketSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    basket: basketReducer,
  },
})
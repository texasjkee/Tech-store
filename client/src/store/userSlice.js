import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from "jwt-decode"

// Отримання даних з localStorage при завантаженні додатка
const storedToken = localStorage.getItem('token')
const storedUser = storedToken ? jwtDecode(storedToken) : null

const initialState = {
  isAuth: !!storedToken,
  user: storedUser
    ? { ...storedUser, role: storedUser.role }
    : { userId: '', email: '', role: '' },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    updateUserAuthStatus: (state, action) => {
      state.isAuth = action.payload
    },
  },
})

export const { setIsAuth, setUser, updateUserAuthStatus } = userSlice.actions

export const selectIsAuth = (state) => state.user.isAuth
export const selectUser = (state) => state.user.user

export default userSlice.reducer
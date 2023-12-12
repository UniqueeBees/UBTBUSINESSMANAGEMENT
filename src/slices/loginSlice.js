import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: false,
    id:0,
    token:'',
    username:'',
    loginState:'logout',
  },
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.loginState ='login'
      state.id=1
    },
    initiated: (state) => {
      state.loginState ='initiated'
    },
    logout: (state, action) => {
      state.loginState = 'logout'
      state.id=0
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, initiated, logout } = loginSlice.actions

export default loginSlice.reducer
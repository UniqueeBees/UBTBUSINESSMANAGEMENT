import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {accountLoginAPI}from '../common/apiCalls'
import{loginDTO} from '../dto/loginDTO'
import {storeObjectData,storageKeyTypes} from '../common/localStorage'
export const accountLogin = createAsyncThunk(
  'account/accountLogin',
  async (login) => {
    console.log('accountloginapi')
    const response = await accountLoginAPI( login)
    return response.data
  }
)
const initialState= {
  ...loginDTO
}
export const loginSlice = createSlice({
  name: 'login',
  initialState,
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
    setInitial: (state, action) => {
      console.log('setInitial',action)
      if(action && action.payload.login)
      {
        state=action.payload.login
      }
      else
      {
        state=initialState
      }
    },
  },
    extraReducers(builder) {
      builder
        .addCase(accountLogin.pending, (state, action) => {
          console.log('pending')
          state.status = 'loading'
          
        })
        .addCase(accountLogin.fulfilled, (state, action) => {
          console.log('succeeded')
          state.status = 'completed'
          state.id=action.payload.user_id
          state.token=action.payload.token
          state.loginState="login";
          storeObjectData(storageKeyTypes.login,state)
          // Add any fetched posts to the array
          //state.posts = state.posts.concat(action.payload)
          console.log('token',action.payload)
        })
        .addCase(accountLogin.rejected, (state, action) => {
          console.log('failed',action)
          state.status = 'failed'
          state.error = action.error.message
        })
    },
  
})

// Action creators are generated for each case reducer function
export const { login, initiated, logout,setInitial } = loginSlice.actions

export default loginSlice.reducer
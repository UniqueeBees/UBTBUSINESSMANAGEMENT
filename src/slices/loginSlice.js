import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {accountLoginAPI}from '../common/apiCalls'
import{loginDTO} from '../dto/loginDTO'
import {storeObjectData,storageKeyTypes,removeStoreObjectData} from '../common/localStorage'
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
      state=initialState;
      removeStoreObjectData(storageKeyTypes.login);
    },
    setInitial: (state, action) => {
      
      if(action && action.payload)
      {
        console.log('setInitial1',action)
       // state=action.payload
        state.reqStatus = action.payload.reqStatus
            state.loginAction = action.payload.loginAction
            state.id=action.payload.id
            state.token=action.payload.token
            state.loginState=action.payload.loginState;
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
          state.reqStatus = 'loading'
          state.loginState=false;
        })
        .addCase(accountLogin.fulfilled, (state, action) => {
          if(action.payload.status)
          {
            console.log('succeeded')
            state.reqStatus = 'completed'
            state.loginAction = 'login'
            state.id=action.payload.user_id
            state.token=action.payload.token
            state.loginState=true;
            storeObjectData(storageKeyTypes.login,state)
          }
         else
         {
          state.reqStatus = 'completed'
          state.loginAction = 'failed'
          state.loginState=false;
          state.error = action.payload.message
         }
          // Add any fetched posts to the array
          //state.posts = state.posts.concat(action.payload)
          console.log('token',action.payload)
        })
        .addCase(accountLogin.rejected, (state, action) => {
          console.log('failed',action)
          state.loginAction = 'failed'
          state.loginState=false;
          state.reqStatus = 'completed'
          state.error = action.error.message
        })
    },
  
})

// Action creators are generated for each case reducer function
export const { login, initiated, logout,setInitial } = loginSlice.actions

export default loginSlice.reducer
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {accountLoginAPI,changePassword}from '../common/apiCalls'
import{loginDTO} from '../dto/loginDTO'
import {storeObjectData,storageKeyTypes,removeStoreObjectData} from '../common/localStorage'
export const accountLogin = createAsyncThunk( 
  'account/accountLogin',
  async (login) => {
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
    resetLoginStatus: (state) => {
      state.loginAction ='idle'
    },
    logout: (state) => {
      console.log('before logout',state)
     // state={...initialState};
      state.loginState=false;
      state.loginAction='logout'
      state.id=0
      state.token=''
      state.username=''
      removeStoreObjectData(storageKeyTypes.login);
    },
    setInitial: (state, action) => {
      
      if(action && action.payload)
      {
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
export const { resetLoginStatus, logout,setInitial } = loginSlice.actions

export default loginSlice.reducer
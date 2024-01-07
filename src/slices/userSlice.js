import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getUser}from '../common/apiCalls';
import{buildUserDTO,userDTO}from '../dto/userDTO';
const initialState={
    user:userDTO,
    hasUser:false,
}
export const getUserProfile = createAsyncThunk(
    'user/getUser',
    async (token) => {
      const response = await getUser(token)
      return response.data
    }
  )
export const userSlice=createSlice({
        name:'user',
        initialState,
    reducers:{
        resetUser: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.userDTO =userDTO;
            state.hasUser=false;
            
          },
    },
extraReducers(builder){
    builder
    .addCase(getUserProfile.pending, (state, action) => {
        
        state.loading = true;
        state.hasError=false;
        state.hasUser=false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        
        console.log('getUserReducer',action)
        state.loading = false;
        const resp=action.payload;
        if(resp.status){
          state.hasError=false;
          const user=buildUserDTO(resp.user)
          state.userDTO=user;
          state.hasUser=true;
        }
        else{
          state.hasError=true;
          state.hasUser=false;
        }

      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.log('getUserReducerError',action)
        state.hasError=true;
        state.loading = false;
        state.hasUser=false;

      })
},

})

export const {resetUser } = userSlice.actions
export default userSlice.reducer;
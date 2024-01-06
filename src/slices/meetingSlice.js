import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getMeetingsByUser}from '../common/apiCalls';
import{buildMeetingListItems}from '../dto/meetingDTO';
const initialState={
    listItems:[],
    pageCount:0,
    pageItemCount:10,
    fetchedItemCount:0,
    loading:false,
    fullyLoaded:false,
    hasNewItem:false,
    hasError:false,
}
export const getMeetingListByUser = createAsyncThunk(
    'meeting/getlistByUser',
    async (token) => {
      const response = await getMeetingsByUser(token)
      return response.data
    }
  )
export const meetingSlice=createSlice({
        name:'meeting',
        initialState,
    reducers:{
        reset: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.listItems =[]
            
          },
    },
extraReducers(builder){
    builder
    .addCase(getMeetingListByUser.pending, (state, action) => {
        
        state.loading = true;
        state.hasError=false;
      })
      .addCase(getMeetingListByUser.fulfilled, (state, action) => {
        
        console.log('meetingList',action)
        state.loading = false;
        const resp=action.payload;
        if(resp.status){
          state.hasError=false;
          const meetingListItems=buildMeetingListItems(resp.meetings)
          state.listItems=meetingListItems;
        }
        else{
          state.hasError=true;
        }

      })
      .addCase(getMeetingListByUser.rejected, (state, action) => {
        console.log('meetingListError',action)
        state.hasError=true;
        state.loading = false;

      })
},

})

export const {reset } = meetingSlice.actions
export default meetingSlice.reducer;
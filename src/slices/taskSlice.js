import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getTasksByUser}from '../common/apiCalls';
import{buildTaskListItems}from '../dto/taskDTO';
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
export const getTaskListByUser = createAsyncThunk(
    'task/getlistByUser',
    async (token) => {
      const response = await getTasksByUser(token)
      return response.data
    }
  )
export const taskSlice=createSlice({
        name:'task',
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
    .addCase(getTaskListByUser.pending, (state, action) => {
        
        state.loading = true;
        state.hasError=false;
      })
      .addCase(getTaskListByUser.fulfilled, (state, action) => {
        
        console.log('taskList',action)
        state.loading = false;
        const resp=action.payload;
        if(resp.status){
          state.hasError=false;
          const taskListItems=buildTaskListItems(resp.tasks)
          state.listItems=taskListItems;
        }
        else{
          state.hasError=true;
        }

      })
      .addCase(getTaskListByUser.rejected, (state, action) => {
        console.log('taskListError',action)
        state.hasError=true;
        state.loading = false;

      })
},

})

export const {reset } = taskSlice.actions
export default taskSlice.reducer;
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {taskMessageDTO} from '../dto/taskDTO'
const initialState={

    message:taskMessageDTO,
}

export const createTaskMessage=createAsyncThunk(
    'task/createNewMessage', 
    async (token,taskMessage)=>{
      
    }
)

export const taskMessageSlice=createSlice(
{
   name :"taskMessage",
   initialState,
   reducers:{
      reset:(state)=>{
        state.message=taskMessageDTO;
      }
   },
   extraReducers(builder){
        builder.addCase()
   }
});
export default taskMessageSlice.reducer;
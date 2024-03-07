import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  getMeetingPurposeList,getTravelVehicleList  } from '../common/apiCalls';
import { buildPurposeListItems } from '../dto/travelDTO';
const initialState={
    isAuthInvalid:false,
    loadingPurposeList:false,
    errorloadingPurposeList:false,
    purposeList:[]
}
export const getPurposeList = createAsyncThunk(
    'meeting/getMeetingPurpose',
    async (token) => {
      const response = await getMeetingPurposeList(token)
      return response.data
    }
  )
  export const getVehicleList=createAsyncThunk(
    'meeting/getVehicleList',
    async(token)=>{
      const response =await getTravelVehicleList(token)
      return response.data;
    }
  )
export const travelSlice=createSlice(
    {
        name:"travel",
        initialState,
        reducers:{
            reset:(state)=>{
                state.purposeList=[];
            }
        },
        extraReducers(builder){
              builder.addCase(getPurposeList.pending,(state,action)=>{
                    state.loadingPurposeList=true;
                    state.errorloadingPurposeList=false;
              }),
              builder.addCase(getPurposeList.fulfilled,(state,action)=>{
                   state.loadingPurposeList=false;
                   const resp=action.payload;
                   if(resp.status)
                   {
                    state.errorloadingPurposeList = false;
                    const purposeList = buildPurposeListItems(resp.purposes)
                    state.purposeList = purposeList;
                   }else{
                    state.errorloadingPurposeList=true;
                   }
              }),
              builder.addCase(getPurposeList.rejected,(state,action)=>{
                if (action.error && action.error.message === 'Request failed with status code 401') {
                    state.isAuthInvalid = true;
                  }
                    state.errorloadingPurposeList=true;
                    state.purposeList=[];
              }),
              builder.addCase(getVehicleList.pending,(state,action)=>{
                   
              }),
              builder.addCase(getVehicleList.fulfilled,(state,action)=>{
                const resp=action.payload;
                if(resp.status){
                   const vehicleList=buildVehicleListItems(resp.vehicles)
                   state.vehicleList=vehicleList;
                }

              }),
              builder.addCase(getVehicleList.rejected,(state,action)=>{
                if (action.error && action.error.message === 'Request failed with status code 401') {
                  state.isAuthInvalid = true;
                }
                state.vehicleList=[];
              })
        }
    }
) 
export const { reset } = travelSlice.actions
export default travelSlice.reducer;
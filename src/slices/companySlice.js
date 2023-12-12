import { createSlice } from '@reduxjs/toolkit'
//import {companyDTO} from '../dto/companyDTO'

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    company:{},
  },
  reducers: {
    setCompany: (state,action) => {
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      //console.log(action)
      state.company =action.payload
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCompany } = companySlice.actions

export default companySlice.reducer
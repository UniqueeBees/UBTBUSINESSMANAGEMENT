import { createSlice } from '@reduxjs/toolkit'
import {  navigationRoutes } from '../common/navigation'
export const initialPageSlice = createSlice({
  name: 'initialPage',
  initialState:{page:''},
  reducers: {
    setPage: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.page =action.payload
    },
  }, 
})

// Action creators are generated for each case reducer function
export const {setPage } = initialPageSlice.actions
export default initialPageSlice.reducer
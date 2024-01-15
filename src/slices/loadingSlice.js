import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
 }

export const loadingSlice = createSlice({
  name: 'error',
  initialState: initialState,

  reducers: {
      showLoading: (state, action) => {
      state.loading=action.payload

    },
   }
})

// Action creators are generated for each case reducer function
export const { showLoading } = loadingSlice.actions

export default loadingSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  show: false,
  alert: {}

}

export const alertSlice = createSlice({
  name: 'error',
  initialState: initialState,

  reducers: {
      showAlert: (state, action) => {
      state.show = true,
      state.alert=action.payload

    },
    hideAlert: (state, action) => {

      state = initialState

    }
  }
})

// Action creators are generated for each case reducer function
export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer
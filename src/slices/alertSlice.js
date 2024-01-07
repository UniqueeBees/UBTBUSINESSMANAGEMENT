import { createSlice } from '@reduxjs/toolkit'
import { loginLanguageDTO, dashboardLanguageDTO } from '../dto/languageDTO'
const initialState = {
  show: false,
  alert: {}

}
export const alertSlice = createSlice({
  name: 'error',
  initialState: initialState,

  reducers: {
    showAlert: (state, action) => {
console.log(action)
      state.show = show,
      state.alert=action.payload.alert

    },
    hideAlert: (state, action) => {

      state = initialState

    }
  }
})

// Action creators are generated for each case reducer function
export const { showAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer
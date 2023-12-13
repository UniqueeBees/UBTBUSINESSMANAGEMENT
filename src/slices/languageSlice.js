import { createSlice } from '@reduxjs/toolkit'

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language:{},
  },
  reducers: {
    setLanguage: (state,action) => {
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      //console.log(action)
      state.language =action.payload
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
import languageReducer from './slices/languageSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    language:languageReducer
  },
})
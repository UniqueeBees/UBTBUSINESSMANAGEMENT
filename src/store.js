import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
import languageReducer from './slices/languageSlice'
import companyReducer from './slices/companySlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    language:languageReducer,
    company:companyReducer,
  },
})
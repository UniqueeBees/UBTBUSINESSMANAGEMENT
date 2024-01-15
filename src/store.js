import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
import languageReducer from './slices/languageSlice'
import companyReducer from './slices/companySlice'
import initialPageReducer from './slices/initialPageSlice'
import meetingReducer from './slices/meetingSlice'
import taskReducer from './slices/taskSlice'
import userReducer from './slices/userSlice'
import businessReducer from './slices/businessSlice'
import alertReducer from './slices/alertSlice'
import loadingReducer from './slices/loadingSlice' 
export default configureStore({
  reducer: {
    login: loginReducer,
    language:languageReducer,
    company:companyReducer,
    initialPage:initialPageReducer,
    meeting:meetingReducer,
    task:taskReducer,
    user:userReducer,
    business:businessReducer,
    alert:alertReducer,
    loading:loadingReducer
  },
})
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { storeObjectData, storageKeyTypes} from '../common/localStorage'
import {companyDTO} from '../dto/companyDTO'
import {getCompanyAPI} from '../common/apiCalls'
const initialState= {  company:companyDTO,  status:"idle"}
export const companyLogin = createAsyncThunk(
  'company/companyLogin',
  async (domainName) => {
    console.log('getCompanyAPI')
    const response = await getCompanyAPI( domainName)
    
    return response.data
  }
)
export const companySlice = createSlice({
  name: 'company',
  initialState: initialState,
  reducers: {
    setCompany: (state,action) => {
      
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      //console.log(action)
      state.company =action.payload
      
    },

    setInitialCompany: (state, action) => {
      console.log('setInitial',action)
      if(action && action.payload.company)
      {
        state=action.payload.company
      }
      else
      {
        state=initialState
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(companyLogin.pending, (state, action) => {
        console.log('pending')
        state.status = 'loading'
        
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        console.log('succeeded')

        state.status = 'succeeded'
        state.company=action.payload   
        storeObjectData(storageKeyTypes.company,  state.company);
        // Add any fetched posts to the array
        //state.posts = state.posts.concat(action.payload)
        
        console.log('token',action.payload)
      })
      .addCase(companyLogin.rejected, (state, action) => {
        console.log('failed',action)
        state.status = 'failed'
        state.error = action.error.message
        state.company={}
      })
  },
})

// Action creators are generated for each case reducer function
export const { setCompany ,setInitialCompany} = companySlice.actions

export default companySlice.reducer
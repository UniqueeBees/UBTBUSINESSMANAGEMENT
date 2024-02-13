import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { businessDTO, buildDTO, buildBusinessListItems, buildBusinessTypes,buildCityList } from '../dto/businessDTO'
import { getBusinessTypes, getBusinessList, createBusiness, apiCallStatus,getCityListAPI } from '../common/apiCalls'
const initialState = {
  businessList: [],
  businessTypes: [],
  business: businessDTO,
  status: "idle",
  loading: false,
  hasError: false,
  businessSelectedFromForm: {},
  cities:[],
}
export const businessTypes = createAsyncThunk(
  'business/businessTypes',
  async (token) => {
    console.log('getBusinessTypes')
    const response = await getBusinessTypes(token)
    return response.data
  }
)
export const getBusinessListItems = createAsyncThunk(
  'business/getBusinessListItems',
  async (token) => {
    console.log('getBusiness')
    const response = await getBusinessList(token)
    return response.data
  }
)
export const createNewBusiness = createAsyncThunk(
  'business/createNewBusiness',
  async (token, businessDTO) => {
    console.log('create')
    const response = await createBusiness(token, businessDTO)
    return response.data
  }
)
export const getCityList = createAsyncThunk(
  'business/cities',
  async (token) => {
    const response = await getCityListAPI(token)
    return response.data
  }
)
export const businessSlice = createSlice({
  name: 'business',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.businessList = [],
        state.businessTypes = []

    },
    setBusinessSelectFromForm: (state, action) => {
      state.businessSelectedFromForm = action.payload.business;
    },
    resetBusinessName:(state)=>{
      state.businessSelectedFromForm = {};
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getBusinessListItems.pending, (state, action) => {
        console.log(apiCallStatus.pending)
        state.status = apiCallStatus.pending

      })
      .addCase(getBusinessListItems.fulfilled, (state, action) => {
        console.log('businessList', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const businessListItems = buildBusinessListItems(resp.businesses)
          state.businessList = businessListItems;
        }
        else {
          state.hasError = true;
        }
      })
      .addCase(getBusinessListItems.rejected, (state, action) => {
        console.log(apiCallStatus.rejected, action)
        state.status = apiCallStatus.rejected
        state.error = action.error.message
        state.businessList = []
      })
      //Business Types
      .addCase(businessTypes.pending, (state, action) => {
        console.log(apiCallStatus.pending)
        state.status = apiCallStatus.pending

      })
      .addCase(businessTypes.fulfilled, (state, action) => {
        console.log('businessListType', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          state.businessTypes = buildBusinessTypes(resp.types);
        }
        else {
          state.hasError = true;
        }
      })
      .addCase(businessTypes.rejected, (state, action) => {
        console.log(apiCallStatus.rejected, action)
        state.status = apiCallStatus.rejected
        state.error = action.error.message
        state.businessTypes = []
      })
      .addCase(getCityList.fulfilled, (state, action) => {
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          state.cities = buildCityList(resp.cities);
        }
        
      })
  },
})

// Action creators are generated for each case reducer function
export const { reset,setBusinessSelectFromForm,resetBusinessName } = businessSlice.actions
export const getBusinessById = (state, businessId) => state.business.businessList.find(item => item.id === businessId)
export default businessSlice.reducer
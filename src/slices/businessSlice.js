import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { businessDTO, buildDTO, buildBusinessListItems, buildBusinessTypes } from '../dto/businessDTO'
import { attachmentDTO } from '../dto/attachmentDTO'
import { getBusinessTypes, getBusinessList, createBusiness, apiCallStatus,getCountryList } from '../common/apiCalls'
const initialState = {
  businessList: [],
  businessTypes: [],
  business: businessDTO,
  status: "idle",
  loading: false,
  hasError: false,
  businessSelectedFromForm: {},
  countries:[],
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
  async (token, businessDTO,attachmentDTO) => {
    console.log('create business')
    const response = await createBusiness(token, businessDTO)
    let crData= response.data
    if(crData.status){
      console.log('upload business attch')
    attachmentDTO.business_id=crData.business.id;
    const attachRespo=await uploadBusinessImages(token,attachmentDTO)
    } 

  }
)
export const getCountries =createAsyncThunk(
  'business/getCountries',
  async(token)=>{
    const response =await getCountryList(token);
    console.log("getCountries data",response);
    return response.data
  }
)
export const uploadBusinessImages = createAsyncThunk(
  'attachments',
  async (token, attachmentDTO) => {
    console.log('uploadBusinessImages')
    const response = await uploadBusinessImages(token, attachmentDTO)
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
      //Business Countries
      .addCase(getCountries.pending, (state, action) => {
        console.log(apiCallStatus.pending)
        state.status = apiCallStatus.pending

      })
      .addCase(getCountries.fulfilled, (state, action) => {
        console.log('getCountries', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          state.countries =resp.countries
        }
        else {
          state.hasError = true;
        }
      })
      .addCase(getCountries.rejected, (state, action) => {
        console.log(apiCallStatus.rejected, action)
        state.status = apiCallStatus.rejected
        state.error = action.error.message
        state.countries = []
      })
      //Create business
      .addCase(createNewBusiness.pending, (state, action) => {
        console.log(apiCallStatus.pending)
        state.status = apiCallStatus.pending

      })
      .addCase(createNewBusiness.fulfilled, (state, action) => {
        console.log('createNewBusiness', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          //state.countries =resp.countries
        }
        else {
          state.hasError = true;
        }
      })
      .addCase(createNewBusiness.rejected, (state, action) => {
        console.log(apiCallStatus.rejected, action)
        state.status = apiCallStatus.rejected
        state.error = action.error.message
        //state.business = businessDTO
      })
  },
})

// Action creators are generated for each case reducer function
export const { reset,setBusinessSelectFromForm,resetBusinessName } = businessSlice.actions

export default businessSlice.reducer
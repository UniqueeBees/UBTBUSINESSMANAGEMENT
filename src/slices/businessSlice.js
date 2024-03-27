import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { businessDTO, buildDTO, buildBusinessListItems, buildBusinessTypes, buildCityList } from '../dto/businessDTO'
import { attachmentDTO } from '../dto/attachmentDTO'
import { getBusinessTypes, getBusinessList, createBusiness,updateBusiness, apiCallStatus, getCityListAPI, getCountryList,deleteAttachments,addAttachments } from '../common/apiCalls'
import { requestStatusDTO } from '../dto/statusDTO'
import { getCurrentDateTime } from '../common/utility'
const initialState = {
  businessList: [],
  businessTypes: [],
  business: {},
  status: requestStatusDTO.idle,
  loading: false,
  hasError: false,
  businessSelectedFromForm: {},
  cities: [],
  countries: [],
  actionStatus: requestStatusDTO.idle,
  error: "",
  deleteOptions: { initiated: false, id: 0, status: requestStatusDTO.idle },
  addAttachmentOptions:{loading:false,hasError:false,status:requestStatusDTO.idle} ,
  businessAttachment:[attachmentDTO],
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
export const getCityList = createAsyncThunk(
  'business/getCityList',
  async (token) => {
    console.log('getBusiness')
    const response = await getCityListAPI(token)
    return response.data
  }
)
export const createNewBusiness = createAsyncThunk(
  'business/createNewBusiness',
  async (businessObject) => { 
    const formData = new FormData();
    formData.append('type', businessObject.formData.type);
    formData.append('name', businessObject.formData.name);
    formData.append('tags', businessObject.formData.tags);
    formData.append('email', businessObject.formData.email);
    formData.append('phone', businessObject.formData.phone);
    formData.append('mobile', businessObject.formData.phone);
    formData.append('website', businessObject.formData.website);
    formData.append('street', businessObject.formData.street);
    formData.append('area', businessObject.formData.area);
    formData.append('city', businessObject.formData.city);
    formData.append('landmark', businessObject.formData.landmark);
    formData.append('country', businessObject.formData.country);
    formData.append('geo_location', `${businessObject.formData.locationLat},${businessObject.formData.locationLon}`);
 
    console.log('create business',formData)
    const response = await createBusiness(businessObject.token, formData)
    console.log('create business response',response)
    let crData = response.data
    console.log('create business response data',crData)
    if (crData.status) {
      console.log('upload business attch')
      let token=businessObject.token;
      var res=businessObject.uploadImages.map(async (attachObj) => {
        var attachmentObj={...attachObj}
        attachmentObj.business_id = crData.business.id;
        //const attachRespo=await uploadBusinessImages(token,attachObj)
        const response =  addAttachments( attachmentObj,token)
       //return response.data
        console.log('upload business attch 1',response)
        return true;
      })
    }
    return response.data;
  }
)
export const getCountries = createAsyncThunk(
  'business/getCountries',
  async (token) => {
    const response = await getCountryList(token);
    console.log("getCountries data", response);
    return response.data
  }
)
export const uploadBusinessImages = createAsyncThunk( 
  'business/attachments',
  async (token, attachmentDTO) => { 
    console.log('uploadBusinessImages')
    
    const response = await addAttachments( attachmentDTO,token)
    return response.data
  }
)
export const deleteBusiness = createAsyncThunk(
  'business/deleteBusiness',
  async (business) => {
    const formData = new FormData();
    const currenDateTime=getCurrentDateTime();
    formData.append('deleted_at', currenDateTime);
    formData.append('id',  business.id);
    const response = await updateBusiness(business.token, formData)
    let crData = response.data
    if (crData.status) {
      console.log('delete business attch') 
      business.uploadImages.map(async (attachObj) => {
        const response=await deleteAttachments(business.token,attachObj.id)
        return true 
      }) 
    }
    return response.data;
  }
)
export const deleteBusinessAttachments=createAsyncThunk(
  'business/deleteBusinessAttachments',
  async(token,attachmentId)=>{
     const response=await deleteAttachments(token,attachmentId)
     return response.data
  }
)
export const updateBusinessDetails=createAsyncThunk(
  'business/updateBusinessDetails',
  async (businessObject)=>{
    const formData=new FormData();
    formData.append('id', businessObject.formData.id);
    formData.append('type', businessObject.formData.type);
    formData.append('name', businessObject.formData.name);
    formData.append('tags', businessObject.formData.tags);
    formData.append('email', businessObject.formData.email);
    formData.append('phone', businessObject.formData.phone);
    formData.append('mobile', businessObject.formData.phone);
    formData.append('website', businessObject.formData.website);
    formData.append('street', businessObject.formData.street);
    formData.append('area', businessObject.formData.area);
    formData.append('city', businessObject.formData.city);
    formData.append('landmark', businessObject.formData.landmark);
    formData.append('country', businessObject.formData.country);
    formData.append('geo_location', `${businessObject.formData.locationLat},${businessObject.formData.locationLon}`);

    console.log('update business')
    const response = await updateBusiness(businessObject.token, formData) 
    let crData = response.data
    if (crData.status) {
      console.log('upload business attch') 
      businessObject.uploadImages.map(async (attachObj) => {
        if(attachObj.newAttachment && attachObj.active){
        attachObj.business_id = crData.business.id;
        const attachRespo=await uploadBusinessImages(businessObject.token,attachObj)
        console.log('upload business attch 1',attachRespo)
        return true;
        } 
        if(! attachObj.active){
          const response=await deleteAttachments(businessObject.token,attachObj.id)
         return true
        }
      }) 
    }
    return response.data; 
})

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
    resetBusinessName: (state) => {
      state.businessSelectedFromForm = {};
    },
    setBusinessDeleteOptions: (state, action) => {
      state.deleteOptions = action.payload;
    },
    resetBusinessDeleteOptions: (state, action) => {
      state.deleteOptions = { initiated: false, id: 0, status: requestStatusDTO.idle };
    },
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
          state.countries = resp.countries
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
      .addCase(getCityList.fulfilled, (state, action) => {
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          state.cities = buildCityList(resp.cities)
        }
        else {
          state.hasError = true;
        }
      })
      //Create business
      .addCase(createNewBusiness.pending, (state, action) => {
        console.log(apiCallStatus.pending)
        state.status = apiCallStatus.pending
        state.actionStatus = requestStatusDTO.pending;

      })
      .addCase(createNewBusiness.fulfilled, (state, action) => {
        console.log('createNewBusiness', action)
        state.loading = false;
        const resp = action.payload;
        state.status = requestStatusDTO.fulfilled
        if (resp.status) {
          state.hasError = false;
          state.error = resp.message
          state.actionStatus = requestStatusDTO.success;
        }
        else {
          state.hasError = true;
          state.error = resp.message
          state.actionStatus = requestStatusDTO.failed;
        }
      })
      .addCase(createNewBusiness.rejected, (state, action) => {
        console.log(apiCallStatus.rejected, action)
        state.status = apiCallStatus.rejected
        state.error = action.error.message
        state.actionStatus = requestStatusDTO.failed;
      })
      .addCase(deleteBusiness.pending, (state, action) => {
        state.deleteOptions.status = requestStatusDTO.pending;
      })
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        const resp = action.payload;
        if (resp.status) {
          state.deleteOptions.status = requestStatusDTO.fulfilled;
          const deletedBusiness=resp.business;
          const index = state.businessList.findIndex(business => business.id === deletedBusiness.id)
          state.businessList.splice(index,1);
        }
        else 
        {
          console.log('deleteBusiness',action)
          state.deleteOptions.status = requestStatusDTO.rejected;
        }

      })
      .addCase(deleteBusiness.rejected, (state, action) => {
        console.log('deleteBusiness',action)
        state.deleteOptions.status = requestStatusDTO.rejected;
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
      })
      .addCase(uploadBusinessImages.pending,(state,action)=>{
         state.addAttachmentOptions.loading=true;
         state.addAttachmentOptions.status=requestStatusDTO.pending;
      })
      .addCase(uploadBusinessImages.fulfilled,(state,action)=>{
        state.addAttachmentOptions.loading=false; 
        const resp=action.payload;
        if(resp.status){
          state.addAttachmentOptions.status=requestStatusDTO.fulfilled;
          state.addAttachmentOptions.hasError=false;
          //const addAttachment=resp.
        }else{
          state.addAttachmentOptions.status=requestStatusDTO.rejected;
        }
     })
     .addCase(uploadBusinessImages.rejected,(state,action)=>{
      state.addAttachmentOptions.loading=false;
      state.addAttachmentOptions.status=requestStatusDTO.rejected;
      if (action.error && action.error.message === 'Request failed with status code 401') {
        state.isAuthInvalid = true;
      }
   })
  },
})

// Action creators are generated for each case reducer function
export const { reset, setBusinessSelectFromForm, resetBusinessName, setBusinessDeleteOptions,resetBusinessDeleteOptions } = businessSlice.actions
export const getBusinessById = (state, businessId) => state.business.businessList.find(item => item.id === businessId)
export default businessSlice.reducer
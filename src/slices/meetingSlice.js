import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeetingsByUser, getMeetingPurposeList, addMeeting, updateMeeting } from '../common/apiCalls';
import { buildMeetingListItems, buildMeetingListItem, buildPurposeListItems, meetingSetupDTO, buildMeetingSetUpDTO } from '../dto/meetingDTO';
import { requestStatusDTO } from "../dto/statusDTO";
import { resetValidationObject } from "../common/utility";
const initialState = {
  isAuthInvalid: false,
  listItems: [],
  purposeList: [],
  meetingSetup: { ...meetingSetupDTO },
  pageCount: 0,
  pageItemCount: 10,
  fetchedItemCount: 0,
  loading: false,
  fullyLoaded: false,
  hasNewItem: false,
  hasError: false,
  saveRequestStatus: requestStatusDTO.idle,
  requiredFieldList: [{ field: 'title', isTouched: false, isValid: false },
  { field: 'purposeId', isTouched: false, isValid: false },
  { field: 'contactId', isTouched: false, isValid: false },
  { field: 'scheduledAt', isTouched: false, isValid: false },
  { field: 'businessId', isTouched: false, isValid: false }
  ]
}
export const getMeetingListByUser = createAsyncThunk(
  'meeting/getlistByUser',
  async (token) => {
    const response = await getMeetingsByUser(token)
    return response.data
  }
)
export const getPurposeList = createAsyncThunk(
  'meeting/getMeetingPurpose',
  async (token) => {
    const response = await getMeetingPurposeList(token)
    return response.data
  }
)
export const addUpdateMeeting = createAsyncThunk(
  'meeting/addUpdateMeeting',
  async (meeting) => {
    const formData = new FormData();
    formData.append('purpose_id', meeting.meetingData.purposeId);
    formData.append('contact_id', meeting.meetingData.contactId);
    formData.append('business_id', meeting.meetingData.businessId);
    formData.append('title', meeting.meetingData.title);
    formData.append('notes', meeting.meetingData.description);
    formData.append('scheduled_at', meeting.meetingData.scheduledAt);
    const response = meeting.meetingData.id ? await updateMeeting(meeting.token, formData, meeting.meetingData.id) : await addMeeting(meeting.token, formData)
    return response.data
  }
)
export const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions. 
      state.listItems = []

    },
    getMeetingByIdFromList: (state, action) => {
      const meeting = state.listItems.find(meeting => meeting.id === action.payload.id)
      if (meeting) {
        state.meetingSetup = buildMeetingSetUpDTO(meeting);
        state.requiredFieldList = resetValidationObject(state.requiredFieldList, state.meetingSetup)
      }
    },
    resetSaveRequestStatus: (state) => {
      state.saveRequestStatus = requestStatusDTO.idle;

    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMeetingListByUser.pending, (state, action) => {

        state.loading = true;
        state.hasError = false;
      })
      .addCase(getMeetingListByUser.fulfilled, (state, action) => {

        console.log('meetingList', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const meetingListItems = buildMeetingListItems(resp.meetings)
          state.listItems = meetingListItems;
        }
        else {
          state.hasError = true;
        }

      })
      .addCase(getMeetingListByUser.rejected, (state, action) => {
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
        console.log('meetingListError', action)
        state.hasError = true;
        state.loading = false;

      })
      .addCase(getPurposeList.fulfilled, (state, action) => {

        console.log('purpose', action)
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const purposeList = buildPurposeListItems(resp.purposes)
          state.purposeList = purposeList;
        }
        else {
          state.hasError = true;
        }

      }).addCase(addUpdateMeeting.pending, (state, action) => {
        state.saveRequestStatus = requestStatusDTO.pending;


      })
      .addCase(addUpdateMeeting.fulfilled, (state, action) => {
        console.log('addNewMeeting-fulfilled', action)
        const resp = action.payload;
        if (resp.status) {
          state.saveRequestStatus = requestStatusDTO.fulfilled;
          if (resp.message === 'created') {
            const newMeeting = buildMeetingListItem(resp.meeting);
            state.listItems.push(newMeeting);
          }
          else if (resp.message === 'updated') {
            const modifiedMeeting = buildMeetingListItem(resp.meeting);
            const index = state.listItems.findIndex(meeting => meeting.id === modifiedMeeting.id)
            state.listItems[index] = modifiedMeeting;
          }
        }
        else {
          state.saveRequestStatus = requestStatusDTO.rejected;
        }

      })
      .addCase(addUpdateMeeting.rejected, (state, action) => {
        console.log('addNewMeeting-rejected', action)
        state.saveRequestStatus = requestStatusDTO.rejected;
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }

      })
    //
  },

})

export const { reset, resetSaveRequestStatus, getMeetingByIdFromList } = meetingSlice.actions
export default meetingSlice.reducer;
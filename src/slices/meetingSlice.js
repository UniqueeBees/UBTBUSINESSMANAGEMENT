import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeetingsByUser,getMeetingPurposeList } from '../common/apiCalls';
import { buildMeetingListItems, buildPurposeListItems,meetingSetupDTO } from '../dto/meetingDTO';
import { requestStatusDTO } from "../dto/statusDTO";
const initialState = {
  listItems: [],
  purposeList: [],
  meetingSetup:{...meetingSetupDTO},
  pageCount: 0,
  pageItemCount: 10,
  fetchedItemCount: 0,
  loading: false,
  fullyLoaded: false,
  hasNewItem: false,
  hasError: false,
  saveRequestStatus: requestStatusDTO.idle,
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
          state.listItems = []; meetingListItems;
        }
        else {
          state.hasError = true;
        }

      })
      .addCase(getMeetingListByUser.rejected, (state, action) => {
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

      })
    //
  },

})

export const { reset } = meetingSlice.actions
export default meetingSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser,getUsers,getContacts } from '../common/apiCalls';
import { buildUserDTO, buildUserListItemDTO, userDTO ,buildContactListItemDTO,buildContactItemDTO} from '../dto/userDTO';
import { requestStatusDTO } from "../dto/statusDTO";
const initialState = {
  userDTO: userDTO,
  userList: { list: [], requestStatus: requestStatusDTO.idle },
  contactList: { list: [], requestStatus: requestStatusDTO.idle },
  hasUser: false,
  isAuthInvalid: false,
}
export const getUserProfile = createAsyncThunk(
  'user/getUser',
  async (token) => {
    const response = await getUser(token)
    return response.data
  }
)
export const getUserList = createAsyncThunk(
  'user/getUsers',
  async (token) => {
    const response = await getUsers(token)
    return response.data
  }
)
export const getContactList = createAsyncThunk(
  'contact/getContactList',
  async (token) => {
    const response = await getContacts(token)
    return response.data
  }
)
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.userDTO = userDTO;
      state.hasUser = false;

    },
    addContactToList: (state,action) => {
      const itemDTO=buildContactItemDTO(action.payload.contact)
      state.contactList.list.push(itemDTO)

    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state, action) => {

        state.loading = true;
        state.hasError = false;
        state.hasUser = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {

        console.log('getUserReducer', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const user = buildUserDTO(resp.user)
          state.userDTO = user;
          state.hasUser = true;
        }
        else {
          state.hasError = true;
          state.hasUser = false;
        }

      })
      .addCase(getUserProfile.rejected, (state, action) => {
        console.log('getUserReducerError', action)
        state.hasError = true;
        state.loading = false;
        state.hasUser = false;
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }

      })
      .addCase(getUserList.pending, (state, action) => {
        state.userList = { list: [], requestStatus: requestStatusDTO.pending };
      })
      .addCase(getUserList.fulfilled, (state, action) => {

        console.log('getUserList', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const userList = buildUserListItemDTO(resp.users)
          state.userList = { list: userList, requestStatus: requestStatusDTO.fulfilled };
        }
        else {
          state.userList = { list: [], requestStatus: requestStatusDTO.rejected };
        }

      })
      .addCase(getUserList.rejected, (state, action) => {
        state.userList = { list: [], requestStatus: requestStatusDTO.rejected };
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
      })
      .addCase(getContactList.pending, (state, action) => {
        state.contactList = { list: [], requestStatus: requestStatusDTO.pending };
      })
      .addCase(getContactList.fulfilled, (state, action) => {

        console.log('getContactList', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const contactList = buildContactListItemDTO(resp.contacts)
          state.contactList = { list: contactList, requestStatus: requestStatusDTO.fulfilled };
        }
        else {
          state.contactList = { list: [], requestStatus: requestStatusDTO.rejected };
        }

      })
      .addCase(getContactList.rejected, (state, action) => {
        console.log('getContactList-rejected', action)
        state.contactList = { list: [], requestStatus: requestStatusDTO.rejected };
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
      })
  },

})

export const { resetUser,addContactToList } = userSlice.actions
export const getUserById = (state, userId) => state.user.userList.list.find(item => item.id === userId)
export const getContactById = (state, contactId) => state.user.contactList.list.find(item => item.id === contactId)
export default userSlice.reducer;
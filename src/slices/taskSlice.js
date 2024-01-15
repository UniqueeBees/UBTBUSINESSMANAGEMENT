import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksByUser, getTaskStatusListAPI, addTask } from '../common/apiCalls';
import { buildTaskListItems, buildTaskStatusList, buildTaskListItem, taskSetupDTO } from '../dto/taskDTO';
import { requestStatusDTO } from "../dto/statusDTO";

const initialState = {
  listItems: [],
  taskStatusList: [],
  taskSetup: { ...taskSetupDTO },
  pageCount: 0,
  pageItemCount: 10,
  fetchedItemCount: 0,
  loading: false,
  fullyLoaded: false,
  hasNewItem: false,
  hasError: false,
  saveRequestStatus: requestStatusDTO.idle,
}
export const getTaskListByUser = createAsyncThunk(
  'task/getlistByUser',
  async (user) => {
    const response = await getTasksByUser(user.token, user.id)
    return response.data
  }
)
export const getTaskStatusList = createAsyncThunk(
  'task/getTaskStatusList',
  async (token) => {
    const response = await getTaskStatusListAPI(token)
    return response.data
  }
)
export const addNewTask = createAsyncThunk(
  'task/addTask',
  async (task) => {
    const formData = new FormData();
    formData.append('assigned_to', task.taskData.assignTo);
    formData.append('title', task.taskData.title);
    formData.append('notes', task.taskData.description);
    if (task.taskData.dueDate) {
      formData.append('due_date', task.taskData.dueDate);
    }
    formData.append("status", 1)
    const response = await addTask(task.token, formData)
    return response.data
  }
)

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.listItems = []
      state.saveRequestStatus = requestStatusDTO.idle;
    },
    resetSaveRequestStatus: (state) => {
      state.saveRequestStatus = requestStatusDTO.idle;

    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTaskListByUser.pending, (state, action) => {

        state.loading = true;
        state.hasError = false;
      })
      .addCase(getTaskListByUser.fulfilled, (state, action) => {

        console.log('taskList', action)
        state.loading = false;
        const resp = action.payload;
        if (resp.status) {
          state.hasError = false;
          const taskListItems = buildTaskListItems(resp.tasks)
          state.listItems = taskListItems;
        }
        else {
          state.hasError = true;
        }

      })
      .addCase(getTaskListByUser.rejected, (state, action) => {
        console.log('taskListError', action)
        state.hasError = true;
        state.loading = false;

      })
      .addCase(getTaskStatusList.fulfilled, (state, action) => {

        console.log('getTaskStatusList', action)
        const resp = action.payload;
        if (resp.status) {
          const taskStatusList = buildTaskStatusList(resp.status_list)
          state.taskStatusList = taskStatusList;
        }

      })
      .addCase(addNewTask.pending, (state, action) => {
        state.saveRequestStatus = requestStatusDTO.pending;


      })
      .addCase(addNewTask.fulfilled, (state, action) => {

        const resp = action.payload;
        if (resp.status) {
          state.saveRequestStatus = requestStatusDTO.fulfilled;
          const newTask = buildTaskListItem(resp.task);
          state.listItems.push(newTask);
        }
        else {
          state.saveRequestStatus = requestStatusDTO.rejected;
        }

      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.saveRequestStatus = requestStatusDTO.rejected;

      })

  },

})

export const selectNotCompletedTasks = (state, userId) => state.task.listItems.filter(item => item.status !== "3"
  && item.assignedTo === userId)
export const selectMyTasks = (state, userId) => state.task.listItems.filter(item => item.assignedTo === userId)

export const { reset,resetSaveRequestStatus } = taskSlice.actions
export default taskSlice.reducer;
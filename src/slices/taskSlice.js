import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksByUser, getTaskStatusListAPI, addTask, updateTask } from '../common/apiCalls';
import { buildTaskListItems, buildTaskStatusList, buildTaskListItem, taskSetupDTO, buildTaskSetupDTOFromTaskListItem } from '../dto/taskDTO';
import { requestStatusDTO } from "../dto/statusDTO";
import { resetValidationObject,getCurrentDateTime } from "../common/utility";

const initialState = {
  isAuthInvalid: false,
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
  requiredFieldList: [{ field: 'title', isTouched: false, isValid: false },
  { field: 'assignTo', isTouched: false, isValid: false },
  ],
  taskSetUpLaunchSource: "taskListLayout",
  deleteOptions: { initiated: false, id: 0,status:requestStatusDTO.idle },
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
export const addUpdateTask = createAsyncThunk(
  'task/addUpdateTask',
  async (task) => {
    const formData = new FormData();
    formData.append('assigned_to', task.taskData.assignTo);
    formData.append('title', task.taskData.title);
    formData.append('notes', task.taskData.description);
    if (task.taskData.dueDate) {
      formData.append('due_date', task.taskData.dueDate);
    }
    if (task.taskData.businessId) {
      formData.append('business_id', task.taskData.businessId);
    }
    if (task.taskData.status) {
      formData.append("status", task.taskData.status)
    }
    else {
      formData.append("status", 1)
    }
    const response = task.taskData.id ? await updateTask(task.token, formData, task.taskData.id) : await addTask(task.token, formData)
    return response.data
  }
)
export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (task) => {
    const formData = new FormData();
    const currenDateTime=getCurrentDateTime();
    formData.append('deleted_at', currenDateTime);
    const response = await updateTask(task.token, formData, task.id)
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
    resetTaskSetUp: (state) => {
      state.taskSetup = initialState.taskSetup;
      state.taskSetUpLaunchSource = "taskListLayout";
      state.saveRequestStatus = requestStatusDTO.idle;
    },
    resetSaveRequestStatus: (state, action) => {
      state.saveRequestStatus = requestStatusDTO.idle;

    },
    getTaskByIdFromList: (state, action) => {
      const task = state.listItems.find(task => task.id === action.payload.id)
      if (task) {
        state.taskSetup = buildTaskSetupDTOFromTaskListItem(task);
        state.requiredFieldList = resetValidationObject(state.requiredFieldList, state.taskSetup)
        state.taskSetUpLaunchSource = action.payload.launchSource
      }
    },
    setTaskDeleteOptions: (state, action) => {
      state.deleteOptions = action.payload;
    },
    resetTaskDeleteOptions: (state, action) => {
      state.deleteOptions = { initiated: false, id: 0,status:requestStatusDTO.idle };
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
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }

      })
      .addCase(getTaskStatusList.fulfilled, (state, action) => {

        console.log('getTaskStatusList', action)
        const resp = action.payload;
        if (resp.status) {
          const taskStatusList = buildTaskStatusList(resp.status_list)
          state.taskStatusList = taskStatusList;
        }

      })
      .addCase(addUpdateTask.pending, (state, action) => {
        state.saveRequestStatus = requestStatusDTO.pending;


      })
      .addCase(addUpdateTask.fulfilled, (state, action) => {

        const resp = action.payload;
        console.log('addUpdateTask.fulfilled', resp)
        if (resp.status) {
          state.saveRequestStatus = requestStatusDTO.fulfilled;
          if (resp.message === 'created') {
            const newTask = buildTaskListItem(resp.task);
            state.listItems.push(newTask);
          }
          else if (resp.message === 'updated') {
            const modifiedTask = buildTaskListItem(resp.task);
            const index = state.listItems.findIndex(task => task.id === modifiedTask.id)
            state.listItems[index] = modifiedTask;
          }

        }
        else {
          state.saveRequestStatus = requestStatusDTO.rejected;
        }

      })
      .addCase(addUpdateTask.rejected, (state, action) => {
        state.saveRequestStatus = requestStatusDTO.rejected;
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.deleteOptions.status = requestStatusDTO.pending;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const resp = action.payload;
        if (resp.status) {
          state.deleteOptions.status = requestStatusDTO.fulfilled;
          const deletedTask=resp.task;
          const index = state.listItems.findIndex(task => task.id === deletedTask.id)
          state.listItems.splice(index,1);
        }
        else 
        {
          state.deleteOptions.status = requestStatusDTO.rejected;
        }

      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteOptions.status = requestStatusDTO.rejected;
        if (action.error && action.error.message === 'Request failed with status code 401') {
          state.isAuthInvalid = true;
        }
      })


  },

})

export const selectNotCompletedTasks = (state, userId) => state.task.listItems.filter(item => item.status !== "3"
  && item.assignedTo === userId)
export const selectMyTasks = (state, userId) => state.task.listItems.filter(item => item.assignedTo === userId)

export const { reset, resetSaveRequestStatus, getTaskByIdFromList, resetTaskSetUp, setTaskDeleteOptions,resetTaskDeleteOptions } = taskSlice.actions
export default taskSlice.reducer;
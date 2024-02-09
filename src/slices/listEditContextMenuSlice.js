import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  show: false,
  position:{},
  settings:{},
 }

export const listEditContextMenuSlice = createSlice({
  name: 'listEditContextMenu',
  initialState: initialState,

  reducers: {
      showContextMenu: (state, action) => {
        console.log('showContextMenu',action)
      state.show=action.payload.show
      if(action.payload.show){
        state.position=action.payload.position
        state.settings=action.payload.settings
      }

    },
   }
})

// Action creators are generated for each case reducer function
export const { showContextMenu } = listEditContextMenuSlice.actions

export default listEditContextMenuSlice.reducer
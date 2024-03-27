import {createSlice} from '@reduxjs/toolkit'
import {businessMessagesDTO} from '../dto/businessMessagesDTO'

const initialState={
 businessMessages: businessMessagesDTO
}

export const businessMessage= createSlice({
    name:'businessMessage',
    initialState,
    reducers:{

    },
    extraReducers(builders){
        
    }
}
);
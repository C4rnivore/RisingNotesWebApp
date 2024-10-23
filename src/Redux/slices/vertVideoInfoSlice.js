import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:''
}

export const vertVideoInfoSlice = createSlice({
    name:'vertVideoInfo',
    initialState,
    reducers:{
        updateVertVideoInfoValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateVertVideoInfoValue } = vertVideoInfoSlice.actions

export default vertVideoInfoSlice.reducer
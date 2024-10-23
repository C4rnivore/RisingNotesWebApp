import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:''
}

export const videoPlayerSlice = createSlice({
    name:'videoPlayer',
    initialState,
    reducers:{
        updateVideoPlayerValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateVideoPlayerValue } = videoPlayerSlice.actions

export default videoPlayerSlice.reducer
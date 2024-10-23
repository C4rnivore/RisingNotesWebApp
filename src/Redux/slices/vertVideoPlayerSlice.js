import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:''
}

export const vertVideoPlayerSlice = createSlice({
    name:'vertVideoPlayer',
    initialState,
    reducers:{
        updateVertVideoPlayerValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateVertVideoPlayerValue } = vertVideoPlayerSlice.actions

export default vertVideoPlayerSlice.reducer
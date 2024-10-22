import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('CURR_SONG');
const valid = saved === undefined ? '' : JSON.parse(saved)
const initialState = {
    value:valid
}

export const currentSongSlice = createSlice({
    name:'currentSong',
    initialState,
    reducers:{
        updateCurrentSongValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateCurrentSongValue } = currentSongSlice.actions

export default currentSongSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('SONGS');
const valid = saved ? JSON.parse(saved) : []
const initialState = {
    value:valid
}

export const songsSlice = createSlice({
    name:'songs',
    initialState,
    reducers:{
        updateSongsValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateSongsValue } = songsSlice.actions

export default songsSlice.reducer
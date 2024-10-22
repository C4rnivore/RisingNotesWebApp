import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('RESIZE');
const actual = saved ? JSON.parse(saved) : 'standart'
const initialState = {
    value: actual
}

export const resizeSlice = createSlice({
    name:'resize',
    initialState,
    reducers:{
        updateResizeValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateResizeValue } = resizeSlice.actions

export default resizeSlice.reducer
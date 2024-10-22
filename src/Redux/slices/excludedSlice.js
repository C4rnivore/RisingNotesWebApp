import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('EXCLUDED')
const valid = saved ? JSON.parse(saved) : []
const initialState = {
    value:valid
}


export const excludedSlice = createSlice({
    name:'excluded',
    initialState,
    reducers:{
        updateExcludedValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateExcludedValue } = excludedSlice.actions

export default excludedSlice.reducer
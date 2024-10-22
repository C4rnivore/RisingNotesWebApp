import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('FEATURED')
const valid = saved ? JSON.parse(saved) : []
const initialState = {
    value:valid
}

export const featuredSlice = createSlice({
    name:'featured',
    initialState,
    reducers:{
        updateFeaturedValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateFeaturedValue } = featuredSlice.actions

export default featuredSlice.reducer
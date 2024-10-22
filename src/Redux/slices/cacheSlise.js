import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: new Map()
}

export const cacheSlice = createSlice({
    name:'cache',
    initialState,
    reducers:{
        updateCacheValue: (state, action) =>{
            state.value.set = (
                action.payload.key,
                action.payload.value
            )
        }
    }
})

export const {updateCacheValue} = cacheSlice.actions

export default cacheSlice.reducer
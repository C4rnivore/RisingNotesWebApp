import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:''
}

export const searchSlice = createSlice({
    name:'searchInput',
    initialState,
    reducers:{
        updateValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const {updateValue} = searchSlice.actions

export default searchSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('SUBS');
const valid = saved ? JSON.parse(saved) : []
const initialState = {
    value:valid
}

export const subscriptionsSlice = createSlice({
    name:'subscriptions',
    initialState,
    reducers:{
        updateSubscriptionsValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const { updateSubscriptionsValue } = subscriptionsSlice.actions

export default subscriptionsSlice.reducer
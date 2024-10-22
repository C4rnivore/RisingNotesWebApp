import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('PLAYLISTS')
const valid = saved ? JSON.parse(saved) : []
const initialState = {
    value:valid
}

export const playlistsSlice = createSlice({
    name:'playlists',
    initialState,
    reducers:{
        updatePlaylistsValue: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const {updatePlaylistsValue} = playlistsSlice.actions

export default playlistsSlice.reducer
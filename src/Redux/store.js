import { configureStore } from "@reduxjs/toolkit"
import searchReducer  from './slices/searchSlice.js'

export default configureStore({
    reducer: {
        searchInput: searchReducer,
    }
})
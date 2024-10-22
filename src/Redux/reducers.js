import searchReducer  from './slices/searchSlice.js'
import resizeReducer from './slices/resizeSlice.js'

const reducers = {
    searchInput: searchReducer,
    resize: resizeReducer
}

export default reducers
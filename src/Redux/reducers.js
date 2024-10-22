import searchReducer  from './slices/searchSlice.js'
import resizeReducer from './slices/resizeSlice.js'
import cacheReducer from './slices/cacheSlise.js'

const reducers = {
    searchInput: searchReducer,
    resize: resizeReducer,
    cache: cacheReducer,
}

export default reducers
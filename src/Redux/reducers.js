import searchReducer  from './slices/searchSlice.js'
import resizeReducer from './slices/resizeSlice.js'
import cacheReducer from './slices/cacheSlise.js'
import filtersReducer from './slices/filtersSlice.js'
import playlistsReducer from './slices/playlistsSlice.js'

const reducers = {
    searchInput: searchReducer,
    resize: resizeReducer,
    cache: cacheReducer,
    filters: filtersReducer,
    playlists:playlistsReducer
}

export default reducers
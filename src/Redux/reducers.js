import searchReducer  from './slices/searchSlice.js'
import resizeReducer from './slices/resizeSlice.js'
import cacheReducer from './slices/cacheSlise.js'
import filtersReducer from './slices/filtersSlice.js'
import playlistsReducer from './slices/playlistsSlice.js'
import excludedReducer from './slices/excludedSlice.js'
import featuredReducer from './slices/featuredSlice.js'
import subscriptionsReducer from './slices/subscriptionsSlice.js'
import currentSongReducer from './slices/currentSongSlice.js'
import songsReducer from './slices/songsSlice.js'

const reducers = {
    searchInput: searchReducer,
    resize: resizeReducer,
    cache: cacheReducer,
    filters: filtersReducer,
    playlists:playlistsReducer,
    excluded: excludedReducer,
    featured: featuredReducer,
    subscriptions:subscriptionsReducer,
    currentSong: currentSongReducer,
    songs: songsReducer
}

export default reducers
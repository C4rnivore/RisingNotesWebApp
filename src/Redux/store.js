import { configureStore } from "@reduxjs/toolkit"
import { enableMapSet } from "immer"
import reducers from "./reducers"

enableMapSet();

export default configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})
import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./activitySlice";
import { api } from "../services";

const store = configureStore({
    reducer: {
        activity: activityReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

type Rootstate = ReturnType<typeof store.getState>
type DispatchType = typeof store.dispatch
export { store, type Rootstate, type DispatchType }
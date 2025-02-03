import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./activitySlice";

const store = configureStore({
    reducer: {
        activity: activityReducer
    }
})

type Rootstate = ReturnType<typeof store.getState>
type DispatchType = typeof store.dispatch
export { store, type Rootstate, type DispatchType }
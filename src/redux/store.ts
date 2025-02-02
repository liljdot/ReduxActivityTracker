import { configureStore } from "@reduxjs/toolkit";
import { activityReducer } from "./activitySlice";

const store = configureStore({
    reducer: {
        activity: activityReducer
    }
})

type Rootstate = ReturnType<typeof store.getState>
export { store, type Rootstate }
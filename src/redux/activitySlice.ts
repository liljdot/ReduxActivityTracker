import { createSlice } from "@reduxjs/toolkit";

export type Activity = {
    id: string
    name: string
    frequency: "daily" | "weekly"
    completedDates: string[]
    createdAt: string
}

interface ActivitySliceState {
    activities: Activity[]
}

const initialState: ActivitySliceState = {
    activities: []
}

const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        addActivity() {

        }
    }
})

const activityReducer = activitySlice.reducer

export {activityReducer}

export const { addActivity } = activitySlice.actions

export type ActivityDispatchType = typeof activitySlice.actions
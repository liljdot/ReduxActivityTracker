import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        addActivity(state, action: PayloadAction<{ name: string, frequency: "daily" | "weekly" }>) {
            const newActivity: Activity = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString()
            }

            state.activities.push(newActivity)
        }
    }
})

const activityReducer = activitySlice.reducer

export { activityReducer }

export const { addActivity } = activitySlice.actions
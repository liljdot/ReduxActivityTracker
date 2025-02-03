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
        },

        toggleActivityComplete(state, action: PayloadAction<{id: string, date: string}>) {
            //find index of target activity
            const index = state.activities.findIndex(activity => activity.id == action.payload.id)
            
            //check if activity is already completed and undo complete
            if (state.activities[index].completedDates.includes(action.payload.date)) {
                state.activities[index].completedDates.pop()
            } else {
                //complete activity for date if not
                state.activities[index].completedDates.push(action.payload.date)
            }
        }
    }
})

const activityReducer = activitySlice.reducer

export { activityReducer }

export const { addActivity, toggleActivityComplete } = activitySlice.actions
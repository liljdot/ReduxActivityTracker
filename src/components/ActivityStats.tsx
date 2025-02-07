import { useSelector } from "react-redux"
import { Rootstate } from "../redux"
import { Paper, Typography } from "@mui/material"
import { Activity } from "../redux/activitySlice"

const ActivityStats: React.FC = () => {
    const {activities, error} = useSelector((state: Rootstate) => state.activity)

    const getCompletedToday: (avtivities: Activity[]) => number = (activities) => {
        const today = new Date().toISOString().split("T")[0]

        let completedToday = 0
        activities.map(activity => {
            if (activity.completedDates.includes(today)) {
                completedToday++
            }
        })
        return completedToday
    }

    const getStreak = (activity: Activity): number => {
        const today = new Date().toISOString().split("T")[0]
        // return if activity not completed today
        if (!activity.completedDates.includes(today)) {
            return 0
        }

        let streak = 1
        // get previous day's date
        const prevDay = new Date()
        prevDay.setDate(prevDay.getDate() - streak)

        //increment streak if completed for previous day. set subsequent previous day
        while (activity.completedDates.includes(prevDay.toISOString().split("T")[0])) {
            streak++
            prevDay.setDate(prevDay.getDate() - streak)
        }

        return streak
    }

    const getLongestStreak = (activities: Activity[]): number => {
        return Math.max(...activities.map(activity => getStreak(activity)))
    }
    return (
        <>
            {error ? <Typography color="error">{error.status}</Typography> 
            : <Paper elevation={2} sx={{p: 2, mt: 4}}>
                <Typography variant="h6" gutterBottom>Activity Stats</Typography>

                <Typography variant="body1">
                    Total Activities: {activities.length}
                </Typography>

                <Typography variant="body1">
                    Completed Today: {getCompletedToday(activities)}
                </Typography>

                <Typography variant="body1">
                    Longest Streak: {getLongestStreak(activities)} days
                </Typography>
            </Paper>}
        </>
    )
}

export default ActivityStats
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, Rootstate } from "../redux"
import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CheckCircle, Delete } from "@mui/icons-material"
import { Activity, deleteActivity, toggleActivityComplete } from "../redux/activitySlice"
import { useGetActivitiesQuery } from "../services"

const ActivityList: React.FC = () => {
    useGetActivitiesQuery()
    const { activities, loading, error } = useSelector((state: Rootstate) => state.activity)
    const dispatch = useDispatch<DispatchType>()
    const [today, setToday] = useState<string>(new Date().toISOString().split("T")[0])

    const handleCompleteClick = (id: string): void => {
        dispatch(toggleActivityComplete({id, date: today}))
    }

    const handleDeleteClick = (id: string): void => {
        dispatch(deleteActivity(id))
    }

    const getStreak = (activity:Activity): number=> {
        // return if activity not completed today
        if (!activity.completedDates.includes(today)) {
            return 0
        }

        let streak = 1
        // get previous day's date
        const prevDay = new Date()
        prevDay.setDate(prevDay.getDate() - streak)

        //increment streak if completed for previous day. set subsequent previous day
        while(activity.completedDates.includes(prevDay.toISOString().split("T")[0])) {
            streak++
            prevDay.setDate(prevDay.getDate() - streak)
        }

        return streak
    }

    // check every minute if date has changed and set new date
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (new Date().toISOString().split("T")[0] == today) {
                return
            }
    
            setToday(new Date().toISOString().split("T")[0])
        }, 60000)

        return clearInterval(intervalId)
    }, [])

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
                {loading && <LinearProgress />}
                {activities.map(activity => (
                    <Paper key={activity.id} elevation={2} sx={{ p: 2 }}>
                        <Grid container alignItems={"center"}>
                            <Grid xs={12} sm={6}>
                                <Typography variant="h6">{activity.name}</Typography>

                                <Typography variant="body2" color="text-secondary" sx={{ textTransform: "capitalize" }}>{activity.frequency}</Typography>
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button variant="outlined" color={activity.completedDates.includes(today) ? "success" : "primary"} startIcon={<CheckCircle />} onClick={() => {handleCompleteClick(activity.id)}}>
                                        {activity.completedDates.includes(today) ? "Completed" : "Mark Complete"}
                                    </Button>

                                    <Button variant="outlined" color={"error"} startIcon={<Delete />} onClick={() => handleDeleteClick(activity.id)}>Remove</Button>
                                </Box>
                            </Grid>
                        </Grid>

                        <Box sx={{mt: 2}}>
                            <Typography variant="body2">
                                Current Streak: {getStreak(activity)} days
                            </Typography>

                            <LinearProgress variant="determinate" value={getStreak(activity)/30 * 100} sx={{mt: 1}}/>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </>
    )
}

export default ActivityList
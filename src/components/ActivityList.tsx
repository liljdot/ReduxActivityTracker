import { useDispatch, useSelector } from "react-redux"
import { DispatchType, Rootstate } from "../redux"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CheckCircle, Delete } from "@mui/icons-material"
import { toggleActivityComplete } from "../redux/activitySlice"

const ActivityList: React.FC = () => {
    const { activities } = useSelector((state: Rootstate) => state.activity)
    const dispatch = useDispatch<DispatchType>()
    const [today, setToday] = useState<string>(new Date().toISOString().split("T")[0])

    const handleCompleteClick = (id: string): void => {
        dispatch(toggleActivityComplete({id, date: today}))
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

                                    <Button variant="outlined" color={"error"} startIcon={<Delete />}>Remove</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Box>
        </>
    )
}

export default ActivityList
import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Activity, deleteActivity, toggleActivityComplete } from "../redux/activitySlice";
import { CheckCircle, Delete } from "@mui/icons-material"
import { useDispatch } from "react-redux";
import { DispatchType } from "../redux";
import { useDeleteActiivityMutation, usePatchActivityMutation } from "../services";

interface Props {
    activity: Activity
    today: string
}

const SingleActivity: React.FC<Props> = ({ activity, today }) => {
    const dispatch = useDispatch<DispatchType>()
    const [deleteActivityMutation, { isLoading, isError }] = useDeleteActiivityMutation()
    const [patchActivityMutation] = usePatchActivityMutation()

    const handleCompleteClick = (): void => {
        const updatedActivity = {...activity, completedDates: [...activity.completedDates]}

        if (updatedActivity.completedDates.includes(today)) {
            updatedActivity.completedDates.pop()
        } else {
            updatedActivity.completedDates.push(today)
        }

        patchActivityMutation(updatedActivity)
        .then(() => dispatch(toggleActivityComplete({ id: activity.id, date: today })))
        .catch(err => console.log(err))
    }

    const handleDeleteClick = (): void => {
        deleteActivityMutation(activity.id).unwrap()
            .then(() => dispatch(deleteActivity(activity.id)))
            .catch((err: any) => console.log(err))
    }

    const getStreak = (activity: Activity): number => {
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

    return (
        <>
            <Paper key={activity.id} elevation={2} sx={{ p: 2 }}>
                <Grid container alignItems={"center"}>
                    <Grid xs={12} sm={6}>
                        <Typography variant="h6">{activity.name}</Typography>

                        <Typography variant="body2" color="text-secondary" sx={{ textTransform: "capitalize" }}>{activity.frequency}</Typography>
                    </Grid>

                    <Grid xs={12} sm={6}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            <Button variant="outlined" color={activity.completedDates.includes(today) ? "success" : "primary"} startIcon={<CheckCircle />} onClick={handleCompleteClick}>
                                {activity.completedDates.includes(today) ? "Completed" : "Mark Complete"}
                            </Button>

                            <Button variant="outlined" color={"error"} startIcon={<Delete />} onClick={handleDeleteClick}>Remove</Button>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                            {isError && <Typography variant="body2" sx={{ display: "inline" }}>Unable to delete activity</Typography>}
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Current Streak: {getStreak(activity)} days
                    </Typography>

                    {isLoading ? <LinearProgress /> : <LinearProgress variant="determinate" value={getStreak(activity) / 30 * 100} sx={{ mt: 1 }} />}
                </Box>
            </Paper>
        </>
    )
}

export default SingleActivity
import { useSelector } from "react-redux"
import { Rootstate } from "../redux"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetActivitiesQuery } from "../services"
import SingleActivity from "./SingleActivity"

const ActivityList: React.FC = () => {
    useGetActivitiesQuery()
    const { activities, loading, error } = useSelector((state: Rootstate) => state.activity)
    const [today, setToday] = useState<string>(new Date().toISOString().split("T")[0])


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
                {error && <Typography variant="h6" textAlign={"center"}>Unable to fetch Activities</Typography>}
                {activities.map(activity => <SingleActivity key={activity.id} activity={activity} today={today} />)}
            </Box>
        </>
    )
}

export default ActivityList
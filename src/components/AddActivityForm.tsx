import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addActivity, DispatchType } from "../redux"
import { usePostActivityMutation } from "../services"
import { Activity } from "../redux/activitySlice"

const AddActivityForm: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily")
    const dispatch = useDispatch<DispatchType>()
    const [postActivity, {isLoading, isError, data, error}] = usePostActivityMutation()

    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault()

        if (name.trim()) {
            const newActivity: Activity = {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString()
            }

            postActivity(newActivity).unwrap()
            .then(res => dispatch(addActivity(res)))
            .catch(e => console.log(e))
            
            setName("")
            setFrequency("daily")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <TextField
                        label="Activity Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter Activity"
                    />

                    <FormControl fullWidth>
                        <InputLabel>Frequency</InputLabel>

                        <Select value={frequency} onChange={e => { setFrequency(e.target.value) }}>
                            <MenuItem value="daily">Daily</MenuItem>

                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">Add Activity</Button>
                    {isLoading && <LinearProgress />}
                    {isError&& <Typography variant="h6" textAlign={"center"}>Unable to Add Activity</Typography>}
                </Box>
            </form>
        </>
    )
}

export default AddActivityForm
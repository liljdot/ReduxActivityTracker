import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addActivity, DispatchType } from "../redux"

const AddActivityForm: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily")
    const dispatch = useDispatch<DispatchType>()

    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault()

        if (name.trim()) {
            dispatch(addActivity({name, frequency}))
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

                        <Select value={frequency} onChange={e => {setFrequency(e.target.value)}}>
                            <MenuItem value="daily">Daily</MenuItem>

                            <MenuItem value="weekly">Weekly</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">Add Activity</Button>
                </Box>
            </form>
        </>
    )
}

export default AddActivityForm
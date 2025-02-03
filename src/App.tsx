import { Container, Typography } from "@mui/material"
import AddActivityForm from "./components/AddActivityForm"

function App() {

  return (
    <>
      <Container maxWidth="md">
        <Typography component={"h1"} variant="h2" align="center">Activity Tracker</Typography>
      </Container>
      <AddActivityForm />
    </>
  )
}

export default App

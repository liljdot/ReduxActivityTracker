import { Container, Typography } from "@mui/material"
import AddActivityForm from "./components/AddActivityForm"
import ActivityList from "./components/ActivityList"
import ActivityStats from "./components/ActivityStats"

function App() {

  return (
    <>
      <Container maxWidth="md">
        <Typography component={"h1"} variant="h2" align="center">Activity Tracker</Typography>
      </Container>
      <AddActivityForm />
      <ActivityList />
      <ActivityStats />
    </>
  )
}

export default App

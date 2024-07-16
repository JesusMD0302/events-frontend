import EventsContainer from "@/components/Events/EventsContainer";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="main">
      <Typography component="h1" variant="h4">
        Eventos cercanos
      </Typography>
      <EventsContainer />
    </Box>
  );
}

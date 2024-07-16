import EventsContainer from "@/components/Event/EventsContainer";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="section">
      <Typography component="h1" variant="h4">
        Eventos cercanos
      </Typography>
      <EventsContainer />
    </Box>
  );
}

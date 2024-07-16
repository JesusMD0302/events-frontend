import EventsContainer from "@/components/Event/EventsContainer";
import { Box, Typography } from "@mui/material";

export default function UserEvents() {
  return (
    <Box component="main">
      <Typography component="h1" variant="h4">
        Mis eventos
      </Typography>
      <EventsContainer />
    </Box>
  );
}

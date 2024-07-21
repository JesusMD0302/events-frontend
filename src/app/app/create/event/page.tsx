import EventForm from "@/components/Event/EventForm";
import { Box, Typography } from "@mui/material";

export default function CreateEvent() {
  return (
    <Box component="section" maxWidth="700px" mx="auto">
      <Typography component="h1" variant="h4" fontWeight={700}>
        Crear Evento
      </Typography>
      <EventForm />
    </Box>
  );
}

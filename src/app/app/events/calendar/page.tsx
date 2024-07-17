import EventsCalendar from "@/components/Event/EventsCalendar";
import { Box, Typography } from "@mui/material";

export default function Calendar() {
  return (
    <Box component="section" height="100%" maxHeight="870px">
      <Typography component="h1" variant="h4" fontWeight={700}>
        Calendario
      </Typography>
      <Typography component="p" variant="body2" color="textSecondary">
        Aquí puedes ver todos los eventos programados, seleccionar un evento
        para ver más información y seleccionar un fecha para crear uno nuevo.
      </Typography>

      <EventsCalendar />
    </Box>
  );
}

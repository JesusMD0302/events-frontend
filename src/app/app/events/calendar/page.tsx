import EventsCalendar from "@/components/Event/EventsCalendar";
import { Box } from "@mui/material";

export default function Calendar() {
  return (
    <Box component="section" height="100%" maxHeight="870px">
      <EventsCalendar />
    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";
import { EventApp } from "@/types/event";

interface EventsContainerProps {
  events: EventApp[];
}

export default function EventsContainer({ events }: EventsContainerProps) {
  return (
    <Box
      component="section"
      mt={2}
      display="grid"
      gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }}
      gap={2}
    >
      {events.length === 0 && (
        <Typography
          component="p"
          gridColumn="1 / -1"
          height={300}
          variant="body1"
          align="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          No hay eventos disponibles
        </Typography>
      )}

      {events.length > 0 &&
        events.map((event, index) => <EventCard key={index} />)}
    </Box>
  );
}

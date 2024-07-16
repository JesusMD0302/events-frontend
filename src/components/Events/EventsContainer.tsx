import { Box } from "@mui/material";
import EventCard from "./EventCard";
import { EventApp } from "@/types/event";

interface EventsContainerProps {
  events: EventApp[];
}

export default function EventsContainer() {
  return (
    <Box
      component="section"
      mt={2}
      display="grid"
      gridTemplateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "repeat(3, 1fr)" }}
      gap={2}
    >
      {[1, 2, 3, 4, 5].map((event) => (
        <EventCard key={event} />
      ))}
    </Box>
  );
}

import EventCard from "@/components/Event/EventCard";
import EventsContainer from "@/components/Event/EventsContainer";
import api from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { EventApp } from "@/types/event";
import { Box, Typography } from "@mui/material";
import { getServerSession, Session } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { user } = session as Session;
  const token = user.token;

  if (!token) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  let events: EventApp[] = [];
  try {
    const res = await api.get("/events/getEvent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    events = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <Box component="section">
      <Typography component="h1" variant="h4">
        Eventos cercanos
      </Typography>
      <EventsContainer events={events}>
        {events.map((eventApp, index) => (
          <EventCard key={index} event={eventApp} />
        ))}
      </EventsContainer>
    </Box>
  );
}

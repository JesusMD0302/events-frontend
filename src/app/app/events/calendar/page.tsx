import EventsCalendar from "@/components/Event/EventsCalendar";
import api from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { EventApp } from "@/types/event";
import { Box, Typography } from "@mui/material";
import { getServerSession, Session } from "next-auth";

export default async function Calendar() {
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
    <Box component="section" height="100%" maxHeight="870px">
      <Typography component="h1" variant="h4" fontWeight={700}>
        Calendario
      </Typography>
      <Typography component="p" variant="body2" color="textSecondary">
        Aquí puedes ver todos los eventos programados, seleccionar un evento
        para ver más información y seleccionar un fecha para crear uno nuevo.
      </Typography>

      <EventsCalendar events={events} />
    </Box>
  );
}

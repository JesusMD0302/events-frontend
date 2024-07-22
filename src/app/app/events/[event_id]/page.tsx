import AddAttender from "@/components/Event/AddAttender";
import EventAddress from "@/components/Event/EventAddress";
import EventMap from "@/components/Event/EventMap";
import EventStatus from "@/components/Event/EventStatus";
import api from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { EventApp } from "@/types/event";
import {
  ConfirmationNumberOutlined,
  Person,
  PersonOutlineOutlined,
  Place,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { getServerSession, Session } from "next-auth";
import { notFound } from "next/navigation";

export default async function EventInfo({
  params,
}: {
  params: { event_id: string };
}) {
  const session = await getServerSession(authOptions);
  const { user } = session as Session;
  const user_id = user.user.id;
  const token = user.token;

  if (!token) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  let event: EventApp = {
    _id: "",
    name: "",
    date_time: "",
    description: "",
    location: {
      coordinates: [0, 0],
      type: "Point",
    },
    attender: [],
    cost: 0,
    guests: [],
    author: {
      _id: "",
      username: "",
    },
    status: "active",
  };
  try {
    const res = await api.get(`/events/getEventById/${params.event_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    event = res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return notFound();
      }
    }
  }

  const eventStatus =
    event.status === "active"
      ? "Próximo evento"
      : event.status === "canceled"
      ? "Evento cancelado"
      : event.status === "concluded"
      ? "Evento concluido"
      : event.status === "inactive"
      ? "Evento inactivo"
      : event.status;

  const eventCost = event.cost === 0 ? "Gratis" : `$${event.cost}`;

  return (
    <Box component="section">
      <Box component="header">
        <Box component="section" display="flex" alignItems="center" gap={2}>
          <EventStatus content={eventStatus} />
          <Typography
            component="p"
            variant="caption"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <Typography component="span" color="textSecondary">
              {new Date(event.date_time).toLocaleDateString()}
            </Typography>
            {" - "}
            <Typography component="span" color="textSecondary">
              {new Date(event.date_time)
                .toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
                .replace(". ", ".")}
            </Typography>
          </Typography>
        </Box>
        <Typography component="h1" variant="h4" fontWeight={700}>
          {event.name}
        </Typography>
        <Box component="section" display="flex" alignItems="center" gap={4}>
          <Typography
            component="p"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <ConfirmationNumberOutlined /> {eventCost}
          </Typography>
          <Typography
            component="p"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <PersonOutlineOutlined />
            Organizado por {event.author.username}
          </Typography>
        </Box>
      </Box>
      <Box
        component="section"
        mt={4}
        gap={4}
        display="grid"
        gridTemplateColumns="2fr 1fr"
      >
        <Box component="section">
          <Typography component="p">
            {event.description || "No hay descripción disponible."}
          </Typography>
          <Box component="section" mt={4}>
            <Typography
              component="p"
              color="GrayText"
              display="flex"
              gap={1}
              alignItems="center"
              mb={2}
            >
              <Place />
              <EventAddress location={event.location} />
            </Typography>
            <EventMap
              customWidth="100%"
              customHeight="400px"
              location={event.location}
              customZoom={20}
            />
          </Box>
        </Box>
        <Box component="section">
          <Card>
            <CardHeader
              title={
                <Typography variant="h5" component="h2" fontWeight={500}>
                  Invitados Especiales
                </Typography>
              }
            />
            <CardContent>
              <List>
                {event.guests.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No hay invitados registrados" />
                  </ListItem>
                )}
                {event.guests.map((guest) => (
                  <ListItem key={guest}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={guest} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader
              title={
                <Typography variant="h5" component="h2" fontWeight={500}>
                  Asistentes Confirmados
                </Typography>
              }
            />
            <CardContent>
              <List>
                {event.attender.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No hay asistentes confirmados" />
                  </ListItem>
                )}
                {event.attender.map((guest) => (
                  <ListItem key={guest._id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={guest.username} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              {event.attender.find((attender) => attender._id === user_id) ? (
                <Button variant="contained" disabled fullWidth>
                  Ya estas apuntado
                </Button>
              ) : (
                <AddAttender event_id={event._id} user_id={user_id} />
              )}
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

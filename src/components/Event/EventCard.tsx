"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EventMap from "./EventMap";
import { EventApp } from "@/types/event";
import Link from "next/link";
import EditEventStatusOption from "./EditEventStatusOption";

type EventOmited = Omit<EventApp, "guests" | "cost" | "attender">;

interface EventCardProps {
  event: EventOmited;
  statusEditable?: boolean;
}

export default function EventCard({ event, statusEditable }: EventCardProps) {
  return (
    <Card
      // elevation={3}
      variant="outlined"
      sx={{
        display: "grid",
        gridTemplateColumns: { md: "1fr 2fr" },
        alignItems: "stretch",
      }}
    >
      <CardContent>
        <Box component="header" width={{ md: "170px" }}>
          <Box
            component="section"
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle1"
              component="h3"
              display="flex"
              fontWeight={400}
              gap={1}
              alignItems="center"
            >
              <Avatar
                sx={{ width: 24, height: 24 }}
                title={event.author.username}
              />
              {event.author.username}
            </Typography>
            {statusEditable && (
              <EditEventStatusOption
                event_id={event._id}
                currentStatus={event.status}
              />
            )}
          </Box>
          <Typography variant="h5" component="h2" mt={2}>
            {event.name}
          </Typography>
          <Typography component="p" color="textSecondary">
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
        <Typography
          variant="body2"
          component="p"
          mt={2}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
          }}
        >
          {event.description}
        </Typography>
        <Link href={`/app/events/${event._id}`} passHref>
          <Button variant="text" size="small" sx={{ mt: 2 }}>
            Ver más
          </Button>
        </Link>
      </CardContent>
      <CardMedia sx={{ width: "100%" }}>
        <EventMap
          location={event.location}
          customWidth="100%"
          customZoom={17}
          disableDoubleClickZoom
          scrollwheel={false}
          disableGestureHandling
        />
      </CardMedia>
    </Card>
  );
}

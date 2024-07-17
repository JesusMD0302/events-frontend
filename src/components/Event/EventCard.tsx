"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import EventMap from "./EventMap";
import { EventApp } from "@/types/event";
import Link from "next/link";

type EventOmited = Omit<EventApp, "author" | "guests" | "cost" | "attender">;

interface EventCardProps {
  event: EventOmited;
}

export default function EventCard() {
  return (
    <Card
      // elevation={3}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "stretch",
      }}
    >
      <CardContent>
        <Box component="header" width={{ md: "150px" }}>
          <Typography variant="h5" component="h2">
            Evento
          </Typography>
          <Typography component="p" color="textSecondary">
            <Typography component="span" color="textSecondary">
              01/01/2022
            </Typography>
            {" - "}
            <Typography component="span" color="textSecondary">
              10:00
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem et rem nesciunt consequatur quos ipsam enim expedita,
          temporibus numquam inventore vitae tempora beatae cum fuga ullam
          veniam voluptatum? Totam quisquam ea autem architecto ex atque
          voluptatum, modi quo adipisci vel cum voluptas laborum sed explicabo
          natus eos perspiciatis quia aut vitae quis dolores veniam mollitia
          libero?
        </Typography>
        <Link href="/app/events/1" passHref>
          <Button variant="text" size="small" sx={{ mt: 2 }}>
            Ver más
          </Button>
        </Link>
      </CardContent>
      <CardMedia sx={{ width: "100%" }}>
        <EventMap />
      </CardMedia>
    </Card>
  );
}

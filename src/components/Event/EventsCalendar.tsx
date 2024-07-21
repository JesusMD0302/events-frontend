"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
// Fullcalendar
import FullCalendar from "@fullcalendar/react";
// Fullcalendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventApp } from "@/types/event";
import { useEffect, useState } from "react";

interface EventsCalendarProps {
  events: EventApp[];
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const [eventsList, setEventsList] = useState<EventApp[]>([]);
  const router = useRouter();

  const handleSelectDate = (date: string) => {
    router.push(`/app/create/event?date=${date}`);
  };

  const handleSelectEvent = (event: { id: number }) => {
    router.push(`/app/events/${event.id}`);
  };

  useEffect(() => {
    setEventsList(
      events.map((event) => ({
        id: event._id,
        date: event.date_time,
        title: event.name,
        ...event,
      }))
    );
  }, [events]);

  return (
    <Box component="section" height="100%" mt={2}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEventRows={true}
        height={"auto"}
        aspectRatio={1.3}
        dateClick={(arg) => {
          handleSelectDate(arg.dateStr);
        }}
        eventClick={(arg) => {
          handleSelectEvent(arg.event as any);
        }}
        eventDisplay="block"
        views={{
          dayGridMonth: {
            dayMaxEventRows: 3,
          },
        }}
        events={eventsList}
      />
    </Box>
  );
}

"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
// Fullcalendar
import FullCalendar from "@fullcalendar/react";
// Fullcalendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function EventsCalendar() {
  const router = useRouter();

  const handleSelectDate = (date: string) => {
    router.push(`/app/create/event?date=${date}`);
  };

  const handleSelectEvent = (event: { id: number }) => {
    router.push(`/app/events/${event.id}`);
  };

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
        views={{
          dayGridMonth: {
            dayMaxEventRows: 3,
          },
        }}
        events={[
          { id: "1", title: "event 1", date: "2024-07-01" },
          { id: "2", title: "event 2", date: "2024-07-02" },
          { id: "3", title: "event 3", date: "2024-07-02" },
          { id: "4", title: "event 4", date: "2024-07-02" },
          { id: "5", title: "event 5", date: "2024-07-02" },
          { id: "6", title: "event 6", date: "2024-07-02" },
          { id: "7", title: "event 7", date: "2024-07-02" },
          { id: "8", title: "event 8", date: "2024-07-02" },
          { id: "8", title: "event 8", date: "2024-07-02" },
          { id: "8", title: "event 8", date: "2024-07-02" },
          { id: "8", title: "event 8", date: "2024-07-02" },
        ]}
      />
    </Box>
  );
}

import { EventLocation } from "@/types/event";
import { Box } from "@mui/material";

interface EventMapProps {
  location: EventLocation;
}

export default function EventMap() {
  return (
    <Box
      component="section"
      sx={{
        width: { sm: "100%", md: "190px" },
        height: { xs: "200px" },
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43375.80265725688!2d-89.58528719109006!3d21.001798013755938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5677210e3de589%3A0x177bf39f52b5dc86!2sPlaza%20Altabrisa%20M%C3%A9rida!5e0!3m2!1ses-419!2smx!4v1721149309941!5m2!1ses-419!2smx"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
}

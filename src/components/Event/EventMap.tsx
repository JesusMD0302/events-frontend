import { EventLocation } from "@/types/event";
import { Box, SxProps, Theme } from "@mui/material";

interface EventMapProps {
  location?: EventLocation;
  sx?: SxProps<Theme>;
  customWidth?: number | string;
  customHeight?: number | string;
}

export default function EventMap({
  location,
  sx,
  customWidth,
  customHeight,
}: EventMapProps) {
  return (
    <Box
      component="section"
      sx={{
        width: customWidth ?? { sm: "100%", md: "190px" },
        height: customHeight ?? { xs: "200px", md: "100%" },
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

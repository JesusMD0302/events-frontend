"use client";

import { Typography } from "@mui/material";

export default function EventStatus() {
  return (
    <Typography
      component="span"
      color="white"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        paddingY: 0.75,
        paddingX: 1.5,
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      Próximo evento
    </Typography>
  );
}

"use client";

import { Typography } from "@mui/material";

interface EventStatusProps {
  content: string;
}

export default function EventStatus({ content }: EventStatusProps) {
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
      {content}
    </Typography>
  );
}

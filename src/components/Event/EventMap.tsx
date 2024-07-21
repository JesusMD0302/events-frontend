"use client";

import { EventLocation } from "@/types/event";
import { Theme } from "@fullcalendar/core/internal";
import { Box, SxProps } from "@mui/material";
import { Map, MapMouseEvent, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface EventMapProps {
  location?: EventLocation;
  sx?: SxProps<Theme>;
  customWidth?: number | string;
  customHeight?: number | string;
  customZoom?: number;
  disableDoubleClickZoom?: boolean;
  onChange?: (lat: number, lng: number) => void;
}

export default function EventMap({
  location,
  sx,
  customWidth,
  customHeight,
  customZoom,
  disableDoubleClickZoom,
  onChange,
}: EventMapProps) {
  const [locationCoords, setLocationCoords] = useState<EventLocation | null>(
    location ?? null
  );

  const handleMapClick = (e: MapMouseEvent) => {
    const { detail } = e;
    const { latLng } = detail;

    if (latLng) {
      setLocationCoords({
        type: "Point",
        coordinates: [latLng.lat, latLng.lng],
      });

      if (onChange) {
        onChange(latLng.lat, latLng.lng);
      }
    }
  };

  useEffect(() => {
    if (!location) {
      setLocationCoords({
        type: "Point",
        coordinates: [20.9681469, -89.6298724],
      });
    }
  }, [location]);

  return (
    <Box
      component="section"
      sx={{
        width: customWidth ?? { sm: "100%", md: "190px" },
        height: customHeight ?? { xs: "200px", md: "100%" },
        ...{ sx },
      }}
    >
      {locationCoords && (
        <Map
          defaultCenter={{
            lat: locationCoords.coordinates[0],
            lng: locationCoords.coordinates[1],
          }}
          defaultZoom={customZoom ?? 11.5}
          onClick={onChange && handleMapClick}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          disableDoubleClickZoom={disableDoubleClickZoom}
        >
          <Marker
            position={{
              lat: locationCoords.coordinates[0],
              lng: locationCoords.coordinates[1],
            }}
          />
        </Map>
      )}
    </Box>
  );
}

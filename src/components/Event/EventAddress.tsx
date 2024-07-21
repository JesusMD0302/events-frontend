"use client";

import useGeocode from "@/hooks/useGeocode";
import { EventLocation } from "@/types/event";
import { useEffect } from "react";

interface EventAddressProps {
  location: EventLocation;
}

export default function EventAddress({ location }: EventAddressProps) {
  const [address, getGeocode] = useGeocode();

  useEffect(() => {
    getGeocode(location.coordinates[0], location.coordinates[1]);
  }, [location, getGeocode]);

  return <>{address}</>;
}

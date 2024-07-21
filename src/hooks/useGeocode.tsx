import { useCallback, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "";

export default function useGeocode() {
  const [address, setAddress] = useState<string | null>(null);

  const getGeocode = useCallback(async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      setAddress(data.results[0].formatted_address);
    } else {
      console.error("No results found");
    }
  }, []);

  return [address, getGeocode] as const;
}

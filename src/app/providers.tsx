"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionProvider } from "next-auth/react";

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <APIProvider apiKey={apiKey}>{children}</APIProvider>
    </SessionProvider>
  );
}

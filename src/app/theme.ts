"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1a535c",
    },
    secondary: {
      main: "#4ecdc4",
    },
  },
});

export default theme;
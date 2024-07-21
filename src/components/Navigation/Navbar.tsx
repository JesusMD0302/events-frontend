"use client";

import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import Link from "next/link";
import User from "./User";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Drawer from "./Drawer";

const routes = [
  {
    name: "Calendario",
    path: "/app/events/calendar",
  },
  {
    name: "Mis Eventos",
    path: "/app/user/events",
  },
  {
    name: "Crear Evento",
    path: "/app/create/event",
  },
];

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {pathname !== "/auth/signin" && pathname !== "/auth/signup" && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleOpenDrawer}
              edge="start"
              // sx={{ mr: 2, ...(open && { display: "none" }) }}
              sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
            >
              <Menu />
            </IconButton>
          )}
          <Link href="/app/" passHref style={{ flexGrow: 1 }}>
            <Button
              sx={{
                color: "white",
              }}
            >
              Events Management App
            </Button>
          </Link>
          {pathname !== "/auth/signin" && pathname !== "/auth/signup" && (
            <>
              <Box
                component="nav"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {routes.map((route) => (
                  <Link key={route.path} href={route.path} passHref>
                    <Button
                      key={route.path}
                      sx={{
                        p: 1,
                        flexShrink: 0,
                        color: "white",
                      }}
                    >
                      {route.name}
                    </Button>
                  </Link>
                ))}
              </Box>
              <User />
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        routes={routes}
      />
    </>
  );
}

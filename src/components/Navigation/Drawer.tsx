import { Box, Button, Drawer as MUIDrawer } from "@mui/material";

import Link from "next/link";

interface DrawerProps {
  isDrawerOpen: boolean;
  handleCloseDrawer: () => void;
  routes: { name: string; path: string }[];
}

export default function Drawer({
  isDrawerOpen,
  handleCloseDrawer,
  routes,
}: DrawerProps) {
  return (
    <MUIDrawer
      variant="temporary"
      anchor="left"
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      sx={{
        display: { xs: "block", sm: "none" },
      }}
    >
      <Box
        sx={{
          width: 250,
          height: "100%",
          backgroundColor: "primary.main",
          display: "flex",
          flexDirection: "column",
          py: 2,
        }}
        role="presentation"
        onClick={handleCloseDrawer}
      >
        {routes.map((route) => (
          <Link key={route.path} href={route.path} passHref>
            <Button
              key={route.path}
              fullWidth
              sx={{
                p: 2,
                flexShrink: 0,
                color: "white",
                ":hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {route.name}
            </Button>
          </Link>
        ))}
      </Box>
    </MUIDrawer>
  );
}

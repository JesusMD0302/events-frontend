import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="p" variant="h6">
          Events Management App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

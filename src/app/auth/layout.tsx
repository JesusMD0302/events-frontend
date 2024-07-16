import Navbar from "@/components/Navigation/Navbar";
import { Box, Container } from "@mui/material";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      component="section"
      display="grid"
      gridTemplateRows="auto 1fr"
      sx={{ minHeight: "100vh" }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {children}
      </Container>
    </Box>
  );
}

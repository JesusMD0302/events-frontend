import Navbar from "@/components/Navigation/Navbar";
import { Box, Container } from "@mui/material";

export default function AppLayout({
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
      <Container component="main" sx={{ paddingTop: 2 }}>
        {children}
      </Container>
    </Box>
  );
}

"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  return (
    <Box component="form">
      <Card>
        <CardContent sx={{ padding: 0, ":last-child": { paddingBottom: 0 } }}>
          <Stack
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={4}
            width="100%"
            maxWidth="1000px"
            height="90vh"
            maxHeight="500px"
          >
            <Box
              component="section"
              height="100%"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.light,
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                padding={5}
                width={350}
                height={350}
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                  borderRadius: 50,
                }}
              >
                <Image
                  src="/signin.svg"
                  alt="Sigin image"
                  width={208}
                  height={225}
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </Box>
            <Box component="section" padding={4}>
              <Box>
                <Typography
                  component="h1"
                  variant="h4"
                  fontWeight={700}
                  align="center"
                  color={(theme) => theme.palette.primary.main}
                >
                  Iniciar sesión
                </Typography>

                <Typography
                  variant="subtitle1"
                  color={(theme) => theme.palette.primary.light}
                  align="center"
                >
                  Ingresa tu correo electrónico y contraseña
                </Typography>
              </Box>
              <Box component="section" mt={4}>
                <Stack spacing={2}>
                  <TextField
                    label="Correo electrónico"
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                  />
                  <TextField
                    label="Contraseña"
                    fullWidth
                    margin="normal"
                    type="password"
                  />
                </Stack>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 2 }}
                >
                  Iniciar sesión
                </Button>
                <Link href="/auth/signup" passHref>
                  <Button variant="text" fullWidth sx={{ marginTop: 2 }}>
                    Crea una cuenta
                  </Button>
                </Link>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

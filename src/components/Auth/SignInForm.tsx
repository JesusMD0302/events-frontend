"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
});

export default function SignInForm() {
  const api = useAxios();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/app";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error && result.status === 401) {
          helpers.setStatus("Credenciales inválidas");
        } else {
          helpers.setStatus("");
          router.push(callbackUrl);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent sx={{ padding: 0, ":last-child": { paddingBottom: 0 } }}>
          <Stack
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
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
                display: { xs: "none", md: "flex" },
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
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                  />
                  <TextField
                    label="Contraseña"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    fullWidth
                    margin="normal"
                    type="password"
                  />
                </Stack>
                <Typography color="error" align="center">
                  {formik.status}
                </Typography>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  disabled={formik.isSubmitting}
                  startIcon={
                    formik.isSubmitting && (
                      <CircularProgress size={16} color="inherit" />
                    )
                  }
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

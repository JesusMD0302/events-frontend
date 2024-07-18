"use client";

import useAxios from "@/hooks/useAxios";
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
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const signUpValidationSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es requerido"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
});

export default function SignUpForm() {
  const api = useAxios();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await api.post("/user/signUp", values);
        helpers.setStatus(null);

        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          router.push("/auth/signin");
        } else {
          router.push("/app/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            helpers.setStatus(error.response.data.message);
          }
        }
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent sx={{ padding: 0, ":last-child": { paddingBottom: 0 } }}>
          <Stack
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap={4}
            width="100%"
            maxWidth="1000px"
            height="90vh"
            maxHeight="550px"
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
                  src="/signup.svg"
                  alt="Sigup image"
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
                  Registrate
                </Typography>

                <Typography
                  variant="subtitle1"
                  color={(theme) => theme.palette.primary.light}
                  align="center"
                >
                  Registra tu cuenta para acceder a todos los beneficios
                </Typography>
              </Box>
              <Box component="section" mt={4}>
                <Stack spacing={2}>
                  <TextField
                    label="Nombre de usuario"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    value={formik.values.username}
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                  />
                  <TextField
                    label="Correo electrónico"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    value={formik.values.email}
                    fullWidth
                    margin="normal"
                    autoComplete="off"
                  />
                  <TextField
                    label="Contraseña"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    value={formik.values.password}
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
                  disabled={formik.isSubmitting}
                  startIcon={
                    formik.isSubmitting && (
                      <CircularProgress size={16} color="inherit" />
                    )
                  }
                >
                  Crear cuenta
                </Button>
                {formik.status && (
                  <Typography color="error" align="left">
                    {formik.status}
                  </Typography>
                )}
                <Link href="/auth/signin" passHref>
                  <Button variant="text" fullWidth sx={{ marginTop: 2 }}>
                    ¿Ya tienes una cuenta? Inicia sesión
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

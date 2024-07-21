"use client";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MuiChipsInput } from "mui-chips-input";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import EventMap from "./EventMap";
import { useSession } from "next-auth/react";
import useAxios from "@/hooks/useAxios";
import useGeocode from "@/hooks/useGeocode";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY ?? "";

const validationEventSchema = Yup.object({
  name: Yup.string().required("Ingresa el nombre del evento"),
  date: Yup.date().required("Ingresa la fecha del evento"),
  time: Yup.string().required("Ingresa la hora del evento"),
  description: Yup.string().required("Ingresa la descripción del evento"),
  isFree: Yup.boolean(),
  cost: Yup.number().when("isFree", ([isFree]) =>
    isFree
      ? Yup.number().notRequired().min(0, "El costo no puede ser negativo")
      : Yup.number().required("Ingresa el costo del evento")
  ),
  guests: Yup.array().of(Yup.string()),
  location: Yup.object()
    .shape({
      coordinates: Yup.array()
        .of(Yup.number())
        .required("Ingresa las coordenadas de la ubicación"),
    })
    .required("Ingresa la ubicación del evento"),
});

export default function CreateEventForm() {
  const searchParams = useSearchParams();

  const initDate = searchParams.get("date") || "";

  const { data } = useSession();
  const api = useAxios();

  const [address, getGeocode] = useGeocode();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: initDate,
      time: "",
      description: "",
      isFree: false,
      cost: "",
      guests: [],
      location: null,
    },
    validationSchema: validationEventSchema,
    onSubmit: (values) => {
      const { time, isFree, ...cleanedValues } = values;

      const newValues = {
        author: data?.user?.user.id,
        ...cleanedValues,
        date_time: new Date(`${values.date}T${values.time}`).toISOString(),
      };

      try {
        api.post("/events/createEvent", newValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleChangeIsFree = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("isFree", event.target.checked);
  };

  const handleAddGuest = (value: string[]) => {
    formik.setFieldValue("guests", value);
  };

  const handleChangeLocation = (lat: number, lng: number) => {
    formik.handleBlur("location");
    formik.setFieldValue("location", {
      type: "Point",
      coordinates: [lat, lng],
    });
    getGeocode(lat, lng);
  };

  return (
    <Box component="form" mt={2} onSubmit={formik.handleSubmit}>
      <Box component="section" display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nombre"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          placeholder="Ingresa el nombre del evento"
          fullWidth
        />
        <TextField
          label="Fecha"
          type="date"
          id="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hora"
          type="time"
          id="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Descripción"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          placeholder="Ingresa una descripción del evento"
          fullWidth
          multiline
          rows={4}
        />

        <FormControlLabel
          control={
            <Checkbox
              id="isFree"
              name="isFree"
              checked={formik.values.isFree}
              onChange={handleChangeIsFree}
              onBlur={formik.handleBlur}
            />
          }
          label="Es gratis"
        />

        <Collapse in={!formik.values.isFree}>
          <TextField
            label="Precio"
            type="number"
            id="cost"
            name="cost"
            value={formik.values.cost}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            helperText={formik.touched.cost && formik.errors.cost}
            placeholder="Ingresa el precio del evento"
            fullWidth
          />
        </Collapse>
        <MuiChipsInput
          label="Invitados especiales"
          id="guests"
          name="guests"
          value={formik.values.guests}
          onChange={handleAddGuest}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched.guests && formik.errors.guests) ||
            formik.values.guests.length > 0
              ? "Doble click para editar al invitado"
              : "Enter para agregar al invitado"
          }
          validate={(chipValue) => {
            {
              return {
                isError: chipValue.length < 5,
                textError:
                  "El nombre del invitado es muy corto, mínimo 5 caracteres",
              };
            }
          }}
          renderChip={(Component, key, props) => {
            return (
              <Component
                {...props}
                key={key}
                color="primary"
                sx={{ cursor: "pointer" }}
                avatar={<Avatar>{props.title[0].toUpperCase()}</Avatar>}
              />
            );
          }}
          fullWidth
        />
        <Box component="section">
          <Box component="section">
            <Typography variant="h6" gutterBottom>
              Ubicación:{" "}
            </Typography>
            <Typography component="span" variant="body1">
              {address}
            </Typography>
          </Box>
          {formik.errors.location && (
            <Typography color="error">
              {(formik.errors.location as string) ?? ""}
            </Typography>
          )}
          <Typography variant="body2" mt={2}>
            Haz clic en el mapa para seleccionar la ubicación del evento.
          </Typography>
          <Box component="section" height={500} my={2}>
            <EventMap
              customHeight="100%"
              customWidth="100%"
              onChange={handleChangeLocation}
            />
          </Box>
        </Box>
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ my: 4 }}>
        Crear evento
      </Button>
    </Box>
  );
}

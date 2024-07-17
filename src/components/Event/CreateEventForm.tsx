"use client";

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreateEventForm() {
  const [isFree, setIsFree] = useState(false);
  const searchParams = useSearchParams();

  const initDate = searchParams.get("date") || "";

  const handleChangeIsFree = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFree(event.target.checked);
  };

  return (
    <Box component="form" mt={2}>
      <Box component="section" display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nombre"
          placeholder="Ingresa el nombre del evento"
          fullWidth
        />
        <TextField
          label="Fecha"
          type="date"
          value={initDate}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Hora"
          type="time"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Descripción"
          placeholder="Ingresa una descripción del evento"
          fullWidth
          multiline
          rows={4}
        />

        <FormControlLabel
          control={<Checkbox onChange={handleChangeIsFree} />}
          label="Es gratis"
        />

        <Collapse in={!isFree}>
          <TextField
            label="Precio"
            type="number"
            placeholder="Ingresa el precio del evento"
            fullWidth
          />
        </Collapse>

        <TextField
          label="status"
          type="text"
          select
          fullWidth
          SelectProps={{
            native: true,
          }}
        >
          <option value="active" defaultChecked>
            Activo
          </option>
          <option value="inactive">Inactivo</option>
          <option value="canceled">Cancelado</option>
          <option value="completed">Concluido</option>
        </TextField>
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
        Crear evento
      </Button>
    </Box>
  );
}

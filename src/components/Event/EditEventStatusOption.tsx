"use client";

import useAxios from "@/hooks/useAxios";
import { MoreVert, TaskAlt } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

const menuId = "edit-event-status-menu";

interface EditEventStatusOptionProps {
  event_id: string;
  currentStatus: string;
}

export default function EditEventStatusOption({
  event_id,
  currentStatus,
}: EditEventStatusOptionProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const api = useAxios();
  const { data } = useSession();
  const user_id = data?.user.user.id;

  const isMenuOpen = Boolean(anchorEl);

  const handleEditEventStatusMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeEventStatus = async (status: string) => {
    try {
      await api.patch(`/events/updateStatusEvent/${event_id}`, {
        id_user: user_id,
        status,
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/events/deleteEvent/${event_id}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleEditEventStatusMenuOpen}
        color="inherit"
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {currentStatus !== "concluded" && (
          <MenuItem
            onClick={() => {
              handleChangeEventStatus("concluded");
            }}
          >
            <Button
              variant="contained"
              color="info"
              fullWidth
              startIcon={<TaskAlt />}
            >
              Concluir evento
            </Button>
          </MenuItem>
        )}
        {currentStatus !== "active" && (
          <MenuItem
            onClick={() => {
              handleChangeEventStatus("active");
            }}
          >
            <Button variant="text" color="success" fullWidth>
              Cambiar a activo
            </Button>
          </MenuItem>
        )}
        {currentStatus !== "inactive" && (
          <MenuItem
            onClick={() => {
              handleChangeEventStatus("inactive");
            }}
          >
            <Button variant="text" color="warning" fullWidth>
              Cambiar a inactivo
            </Button>
          </MenuItem>
        )}
        {currentStatus !== "canceled" && (
          <MenuItem
            onClick={() => {
              handleChangeEventStatus("canceled");
            }}
          >
            <Button variant="text" color="error" fullWidth>
              Cambiar a cancelado
            </Button>
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteEvent}>
          <Button variant="outlined" color="error" fullWidth>
            Eliminar evento
          </Button>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Button variant="text" fullWidth>
            Cancelar
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}

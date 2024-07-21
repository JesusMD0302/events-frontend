"use client";

import useAxios from "@/hooks/useAxios";
import { Button } from "@mui/material";

interface AddAttenderProps {
  event_id: string;
  user_id: string;
}

export default function AddAttender({ event_id, user_id }: AddAttenderProps) {
  const api = useAxios();

  const handleAddAttender = async () => {
    try {
      await api.patch(`/events/updateAttendees/${event_id}`, {
        id_user: user_id,
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="contained" onClick={handleAddAttender} fullWidth>
      Apuntarme al evento
    </Button>
  );
}

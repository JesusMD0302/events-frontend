import EventMap from "@/components/Event/EventMap";
import EventStatus from "@/components/Event/EventStatus";
import {
  ConfirmationNumberOutlined,
  Person,
  PersonOutlineOutlined,
  Place,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export default function EventInfo() {
  return (
    <Box component="section">
      <Box component="header">
        <Box component="section" display="flex" alignItems="center" gap={2}>
          <EventStatus />
          <Typography
            component="p"
            variant="caption"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <Typography component="span">01/01/2022</Typography> {" - "}
            <Typography component="span">02:32 pm</Typography>
          </Typography>
        </Box>
        <Typography component="h1" variant="h4" fontWeight={700}>
          Evento
        </Typography>
        <Box component="section" display="flex" alignItems="center" gap={4}>
          <Typography
            component="p"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <ConfirmationNumberOutlined /> Free
          </Typography>
          <Typography
            component="p"
            color="GrayText"
            display="flex"
            gap={1}
            alignItems="center"
          >
            <PersonOutlineOutlined />
            Organizado por {"Jong Doe"}
          </Typography>
        </Box>
      </Box>
      <Box
        component="section"
        mt={4}
        gap={4}
        display="grid"
        gridTemplateColumns="2fr 1fr"
      >
        <Box component="section">
          <Typography component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            eius rem perferendis optio dolorum placeat qui ex deserunt tempore
            voluptates quia, accusamus neque recusandae dolor nulla. Illum dolor
            quasi voluptate, amet architecto vitae nisi. Similique sapiente
            soluta, vero eveniet sed eligendi nulla repellat atque temporibus
            nisi, praesentium adipisci natus ipsa animi mollitia minima
            provident. Eaque quod, eius minima illo sed amet commodi illum!
            Veritatis!
          </Typography>
          <Box component="section" mt={4}>
            <Typography
              component="p"
              color="GrayText"
              display="flex"
              gap={1}
              alignItems="center"
              mb={2}
            >
              <Place />
              123 Main St, San Francisco, CA 94101
            </Typography>
            <EventMap customWidth="100%" customHeight="400px" />
          </Box>
        </Box>
        <Box component="section">
          <Card>
            <CardHeader title="Invitados registrados" />
            <CardContent>
              <List>
                {[1, 2, 3, 4, 5].map((listItem) => (
                  <ListItem key={listItem}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Jane Doe" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

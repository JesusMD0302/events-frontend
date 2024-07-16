type EventStatus = "active" | "inactive" | "canceled" | "concluded";

type EventLocation = {
  type: string;
  coordinates: number[];
};

export type EventApp = {
  author: string;
  name: string;
  date_time: string;
  description: string;
  guests: string[];
  cost: number;
  location: EventLocation;
  status: EventStatus;
  attender: string;
};

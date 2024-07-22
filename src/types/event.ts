type EventStatus = "active" | "inactive" | "canceled" | "concluded";

export type EventLocation = {
  type: string;
  coordinates: number[];
};

type EventAuthor = {
  _id: string;
  username: string;
};

type EventAttender = {
  _id: string;
  username: string;
};

export type EventApp = {
  _id: string;
  author: EventAuthor;
  name: string;
  date_time: string;
  description: string;
  guests: string[];
  cost: number;
  location: EventLocation;
  status: EventStatus;
  attender: EventAttender[];
};

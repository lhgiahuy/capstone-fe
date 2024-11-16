export interface Event {
  eventId: string;
  eventName: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  processNote: string;
  organizerName: string;
  organizerId: string;
  eventTypeName: string;
  statusId: number;
  status: string;
  passwordMeeting: string;
  eventTags: string[];
  thumbnailImg: string;
  linkEvent: string;
  passwordMeeting: string;

  form: [
    {
      name: string;
      type: string;
      options: string[];
    }
  ];
}

export interface DetailEventProps {
  eventId: string;
}

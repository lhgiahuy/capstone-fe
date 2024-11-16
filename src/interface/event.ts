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
  status: string;
  passwordMeeting: string;
  eventTags: string[];
  thumbnailImg: string;
  linkEvent: string;
  form: [
    {
      name: string;
      type: string;
      options: string[];
    }
  ];
}

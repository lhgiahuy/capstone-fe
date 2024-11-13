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
  eventTypeName: string;
  statusId: number;
  eventTags: string;
  thumbnailImg: string;
  status: string;
  linkEvent: string;
  passwordMeeting: string;
}

export interface DetailEventProps {
  eventId: string;
}

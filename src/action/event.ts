import { userAxios } from "@/lib/axios";
export interface getEventProps {
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  EventTypes?: string[];
  InMonth?: number;
  Status?: string;
  EventTag?: string;
  InYear?: number;
}

export interface getParticipantProps {
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  eventId?: string;
}

export interface getOrganizerEventProps {
  UserId?: string;
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  EventTypes?: string[];
  InMonth?: number;
  Status?: string;
  EventTag?: string;
  InYear?: number;
}

export async function getEvent(props?: getEventProps) {
  try {
    const params = new URLSearchParams();

    // Append all properties to the URLSearchParams
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "EventTypes" && Array.isArray(value)) {
          // For EventTypes, append each value as a separate parameter
          value.forEach((type) => params.append("EventTypes", type));
        } else if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const event = await userAxios.get("/events", { params });
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
    throw error;
  }
}

export async function getEventById(id: string) {
  try {
    const event = await userAxios.get(`/events/${id}`);
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function createEvent(data: any) {
  return await userAxios.post("/events", data);
}

export async function submitForm(data: any, eventId: string) {
  return await userAxios.post(`/events/${eventId}/submit-form`, data);
}

export async function approveEvent(
  id: string,
  aprroved: boolean,
  processNote: string
) {
  try {
    await userAxios.put(`/events/${id}/approve?isApproved=${aprroved}`, {
      processNote: processNote,
    });
  } catch (error) {
    console.error("Failed to create event", error);
  }
}

export async function getBanners() {
  try {
    const banner = await userAxios.get("/events/banners");
    return banner.data;
  } catch (error) {
    console.error("Failed to get banner", error);
  }
}

export async function getTag() {
  try {
    const tag = await userAxios.get("/tags");
    return tag.data;
  } catch (error) {
    console.error("Failed to fetch tags data", error);
  }
}

export async function getEventType() {
  try {
    const type = await userAxios.get("/event-types");
    return type.data;
  } catch (error) {
    console.error("Failed to fetch event type data", error);
  }
}
export async function createEventType(eventTypeName: string) {
  try {
    const type = await userAxios.post("/event-types", { eventTypeName });
    return type.data;
  } catch (error) {
    console.error("Failed to create event type data", error);
  }
}

export async function deleteEventType(eventTypeId: string) {
  try {
    const type = await userAxios.delete(`/event-types/${eventTypeId}`);
    return type.data;
  } catch (error) {
    console.error("Failed to delete event type data", error);
  }
}
export async function updateEventType(
  eventTypeId: string,
  eventTypeName: string
) {
  try {
    const type = await userAxios.put(`/event-types/${eventTypeId}`, {
      eventTypeName,
    });
    return type.data;
  } catch (error) {
    console.error("Failed to update event type data", error);
  }
}

export async function getEventByOrganizerPrivate(
  props: getOrganizerEventProps
) {
  try {
    const event = await userAxios.get(`/events/organizerPrivate`, {
      params: props,
    });
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function getEventByOrganizer({
  organizerId,
  status,
}: {
  organizerId: string | undefined;
  status?: string;
}) {
  try {
    const event = await userAxios.get(
      `/events/organizer?OrganizerId=${organizerId}&Status=${status}`
    );
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function deleteEvent(id: string) {
  return await userAxios.delete(`/events/${id}`);
}

export async function getAllEvent(props?: getEventProps) {
  try {
    const event = await userAxios.get(`/events/getAllEvents`, {
      params: props,
    });
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function submitEvent(eventId: string) {
  return await userAxios.put(`/events/${eventId}/submit`);
}

export async function getParticipant(props?: getParticipantProps) {
  try {
    const participants = await userAxios.get(
      `/events/${props?.eventId}/participants`,
      { params: props }
    );
    return participants.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function getSubmittedFormData(eventId: string, userId: string) {
  try {
    const formData = await userAxios.get(
      `/events/${eventId}/get-user-formSubmit?userId=${userId}`
    );
    return formData.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function registerEvent(eventId: string) {
  return await userAxios.post(`/events/${eventId}/register`);
}

export async function unRegisterEvent(eventId: string) {
  return await userAxios.delete(`/events/${eventId}/unregister`);
}

export async function getAverageRating(eventId: string) {
  try {
    const rating = await userAxios.get(`/events/${eventId}/average-rating`);
    return rating.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function reviewEvent(eventId: string, data: any) {
  return await userAxios.post(`/events/${eventId}/reviews`, data);
}

export async function getReview(eventId: string) {
  try {
    const reviews = await userAxios.get(`/events/${eventId}/reviews`);
    return reviews.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function CheckIn(eventId: string, userId: string) {
  return await userAxios.put(
    `/events/${eventId}/checkin-organizer?userId=${userId}`
  );
}

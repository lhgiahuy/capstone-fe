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
}

export async function getEvent(props?: getEventProps) {
  try {
    const event = await userAxios.get("/events", { params: props });
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
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

export async function createEvent(data: any) {
  return await userAxios.post("/events", data);
}

export async function submitForm(data: any, eventId: string) {
  return await userAxios.post(`/events/${eventId}/form-submit`, data);
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

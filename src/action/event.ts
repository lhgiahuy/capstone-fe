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

import { userAxios } from "@/lib/axios";
interface getEventProps {
  SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  eventType?: string;
  inMonth?: number;
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

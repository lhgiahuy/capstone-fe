import { userAxios } from "@/lib/axios";
export async function getEvents() {
  try {
    const event = await userAxios.get("/events");
    return event.data;
  } catch (error) {
    console.error("Failed to fetch events data", error);
  }
}

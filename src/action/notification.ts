import { userAxios } from "@/lib/axios";

export async function sendNotification(data: any) {
  return userAxios.post("/notifications/sendNotification", data);
}

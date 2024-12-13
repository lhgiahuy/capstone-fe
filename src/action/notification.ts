import { userAxios } from "@/lib/axios";

export async function sendNotification(data: any) {
  return userAxios.post("/notifications/sendNotification", data);
}

export async function clearNotification() {
  return userAxios.delete("/users/clear-notifications");
}

export async function deleteNotification(id: string) {
  return userAxios.delete(`/notifications/${id}`);
}

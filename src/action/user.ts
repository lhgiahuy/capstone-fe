import { userAxios } from "@/lib/axios";

export async function getUser() {
  try {
    const user = await userAxios.get("/users");
    return user.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
}

import { TypeOfLoginForm } from "@/app/(user)/(auth)/dang-nhap/_lib/validation";
import { userAxios } from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export async function getUser() {
  try {
    const user = await userAxios.get("/users");
    return user.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
}

export async function loginUser(data: TypeOfLoginForm) {
  return await userAxios.post("/auth/login", {
    email: data.email,
    password: data.password,
  });
}

export async function getMe(config: AxiosRequestConfig = {}) {
  return await userAxios.get("/user/me", { ...config });
}

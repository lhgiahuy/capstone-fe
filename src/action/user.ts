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

export async function approveVerifyUser(
  id: string,
  approved: boolean,
  processNote: string
) {
  try {
    const user = await userAxios.put(
      `/users/${id}/approve?isApproved=${approved}`,
      { processNote: processNote }
    );
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
  return await userAxios.get("/users/me", { ...config });
}

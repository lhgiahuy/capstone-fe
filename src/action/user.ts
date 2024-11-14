import { TypeOfSignUpForm } from "@/app/(user)/(auth)/dang-ky/_lib/validation";
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

export async function signUpStudent(data: TypeOfSignUpForm) {
  return await userAxios.post("/users/register", { ...data, role: "student" });
}

export async function signUpOrganizer(data: TypeOfSignUpForm) {
  return await userAxios.post("/users/register", {
    ...data,
    role: "organizer",
  });
}

export async function getMe(config: AxiosRequestConfig = {}) {
  return await userAxios.get("/users/me", { ...config });
}

export async function updateInfo(data: any) {
  return await userAxios.put("/users/", data);
}

export async function validateUser(data: string) {
  return await userAxios.put("/users/addCard", { cardURL: data });
}

export async function getUserById(id?: string) {
  if (!id) return;
  try {
    const user = await userAxios.get(`/users/${id}`);
    return user.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
}

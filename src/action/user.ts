import { TypeOfSignUpForm } from "@/app/(user)/(auth)/dang-ky/_lib/validation";
import { TypeOfLoginForm } from "@/app/(user)/(auth)/dang-nhap/_lib/validation";
import { userAxios } from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export interface getUserProps {
  // SearchKeyword?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  roleName?: string;
}

export async function getUser(props?: getUserProps) {
  try {
    const user = await userAxios.get("/users", { params: props });
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
  return (await userAxios.get("/users/me", { ...config })).data;
}

export async function updateInfo(data: any) {
  return await userAxios.put("/users/", {
    username: data.username,
    avatarUrl: data.avatarUrl,
    phoneNumber: data.phoneNumber,
  });
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

export async function getRegisteredEvent(
  completed?: boolean,
  InMonth?: number
) {
  try {
    const event = await userAxios.get(
      `/users/participant?inMonth=${InMonth}&isCompleted=${completed}`
    );
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

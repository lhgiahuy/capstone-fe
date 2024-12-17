import { TypeOfSignUpForm } from "@/app/(auth)/dang-ky/_lib/validation";
import { TypeOfLoginForm } from "@/app/(auth)/dang-nhap/_lib/validation";
import { TypeOfOrganizerSignUpForm } from "@/app/organizer/(auth)/dang-ky/_lib/validation";
import { userAxios } from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

export interface getUserProps {
  Username?: string;
  PageSize?: number;
  PageNumber?: number;
  isDescending?: boolean;
  orderBy?: string;
  roleName?: string;
  Verified?: string;
}

export async function getUser(props?: getUserProps) {
  try {
    const user = await userAxios.get("/users", { params: props });
    return user.data;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
}

export async function getBannedUser(props?: getUserProps) {
  try {
    const user = await userAxios.get("users/getListBannedUser", {
      params: props,
    });
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

export async function signUpOrganizer(data: TypeOfOrganizerSignUpForm) {
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
    studentId: data.studentId,
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
  InMonth?: number,
  InYear?: number
) {
  try {
    const event = await userAxios.get(
      `/users/participant?inMonth=${InMonth}&isCompleted=${completed}&inYear=${InYear}`
    );
    return event.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function verifyEmail(userId: string, token: string) {
  try {
    const res = await userAxios.get(
      `/users/verify-email?userId=${userId}&token=${token}`
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function getUserNotification() {
  try {
    const res = await userAxios.get(`/users/notifications`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch event data", error);
  }
}

export async function readNotification(notiId: string) {
  return await userAxios.put(`/notifications/${notiId}/read`);
}

export async function forgotPassword(email: string) {
  return await userAxios.post(`/users/forgot-password`, { email: email });
}

export async function resetPassword({
  userId,
  token,
  password,
}: {
  userId: string;
  token: string;
  password: string;
}) {
  return await userAxios.post(
    `/users/reset-password?userId=${userId}&token=${token}`,
    password
  );
}

export async function deleteUser(userId: string) {
  return await userAxios.delete(`/users/${userId}`);
}

export async function unbanUser(userId: string) {
  return await userAxios.post(`/users/${userId}/unban`);
}

export async function createModerator(data: any) {
  return await userAxios.post("/users/addModerator", data);
}

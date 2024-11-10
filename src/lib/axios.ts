import axios, { InternalAxiosRequestConfig } from "axios";
import { atomStore } from "./atom/store";
import { userAtom } from "./atom/user";

export const userAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

userAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    // const token = localStorage.getItem("token");
    const user = atomStore.get(userAtom);
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

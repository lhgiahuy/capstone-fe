import axios, { InternalAxiosRequestConfig } from "axios";

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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTcyODcyNDA3MSwiZXhwIjoxNzI4NzM0ODcxLCJpYXQiOjE3Mjg3MjQwNzEsImlzcyI6InlvdXItaXNzdWVyIiwiYXVkIjoieW91ci1hdWRpZW5jZSJ9.NTIskd-cdmbTUvML2WPty61ehMYaUTLYRqFqRJg0mUs";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

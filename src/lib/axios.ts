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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzI4MjY4NTM3LCJleHAiOjE3MjgyNzkzMzcsImlhdCI6MTcyODI2ODUzNywiaXNzIjoieW91ci1pc3N1ZXIiLCJhdWQiOiJ5b3VyLWF1ZGllbmNlIn0.QTfGfnpclaE84_3DkKJ-FBI0jF6pZ9X99oRi1G6AOrI";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

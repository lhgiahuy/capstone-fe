"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/action/user";
import ProfileForm from "./_component/form";

export default function Page() {
  const { data } = useQuery({ queryKey: ["Me"], queryFn: getMe });
  if (!data) return <></>;
  return <ProfileForm values={data} />;
}

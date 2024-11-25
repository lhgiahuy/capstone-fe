"use client";

import { getEventByOrganizer } from "@/action/event";
import { getUserById } from "@/action/user";
import EventList from "@/app/(user)/_component/event-list";
import { Event } from "@/interface/event";
import { User } from "@/interface/user";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function OrganizerDetail({
  params,
}: {
  params: { id: string };
}) {
  const { data } = useQuery<Event[]>({
    queryKey: ["event"],
    queryFn: () => getEventByOrganizer({ organizerId: params.id }),
  });
  const { data: organizer } = useQuery<User>({
    queryKey: ["organizer", params.id],
    queryFn: () => getUserById(params.id),
  });
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-[64rem] h-[18rem] z-10">
        <Image
          src={
            data?.at(0)?.thumbnailImg?.startsWith("https://firebase")
              ? data?.at(0)?.thumbnailImg || "/images/image-placeholder.jpg"
              : "/images/image-placeholder.jpg"
          }
          alt="organizer bg"
          fill
          className="object-cover object-top rounded-lg"
        />
      </div>
      <div className="flex px-8 flex-col gap-4 mt-[-4rem] z-20">
        <Image
          src={
            organizer?.avatarUrl.startsWith("https://firebase")
              ? organizer.avatarUrl
              : "/images/image-placeholder.jpg"
          }
          alt="organizer bg"
          width={120}
          height={200}
          className="object-contain rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-bold">
            {organizer?.username}
          </h1>
          <p className="text-muted-foreground">{organizer?.email}</p>
        </div>
      </div>
      <div className="px-4 min-h-screen">
        <EventList event={data}></EventList>
      </div>
    </div>
  );
}

"use client";

import { getEventById } from "@/action/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Event } from "@/interface/event";
import dateFormat from "@/lib/dateFormat";
import { useQuery } from "@tanstack/react-query";
import { Clock, Locate, MapPinned } from "lucide-react";
import Image from "next/image";

export default function EventDetail({ params }: { params: { id: string } }) {
  const { data } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: () => getEventById(params.id),
  });
  if (!data) return <></>;
  return (
    <div className="flex flex-col gap-8">
      <div className="absolute w-full h-[42rem] left-0 top-0 z-[-10] opacity-70">
        <div className="relative w-full h-full">
          <Image
            src="/images/event-bg-4.png"
            alt="event bg"
            fill
            className="object-cover object-top"
          ></Image>
        </div>
      </div>
      <div className="flex min-h-[28rem]">
        <div className="relative w-2/3">
          <Image
            src="/images/event-bg.png"
            alt="event bg"
            fill
            className="object-cover"
          ></Image>
        </div>
        <div className="w-full p-16 bg-background flex flex-col gap-16 justify-between">
          <div className="flex flex-col gap-16">
            <h1 className="text-primary uppercase text-2xl">
              {data.eventName}
            </h1>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <Clock className="text-primary" />
                <p>{dateFormat(data.startTime, "p, d MMMM, y")}</p>
              </div>
              <div className="flex gap-4">
                <MapPinned className="text-primary" />
                <p>{data.location}</p>
              </div>
            </div>
          </div>
          <Button size="lg" className="text-lg">
            Theo dõi
          </Button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="bg-foreground text-background rounded-lg w-full min-h-screen p-4">
          <p>{data.description}</p>
        </div>
        <div className="bg-foreground text-background h-fit p-4 rounded-lg w-1/3 items-center shrink-0 flex flex-col gap-4">
          <h2 className="font-semibold text-xl self-start">Ban Tổ Chức</h2>
          <div className="flex gap-8 py-8 items-center justify-center">
            <div className="rounded-full overflow-hidden relative p-10">
              <Image
                src="/images/organizer-avt.png"
                alt=""
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex flex-col gap-4">
              <p>Organizer Name</p>
              <Button>Xem thông tin</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { getEventById } from "@/action/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/interface/event";
import { formatDate } from "@/lib/date";
import { useQuery } from "@tanstack/react-query";
import { Clock, MapPinned } from "lucide-react";
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
                <p>{formatDate(data.startTime, "p, d MMMM, y")}</p>
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
        <div className="bg-foreground text-background h-full p-4 rounded-lg w-[18rem] shrink-0 flex flex-col gap-4">
          <h2 className="font-semibold text-sm">Tổ chức bởi</h2>
          <Separator></Separator>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden relative p-4">
              <Image
                src="/images/organizer-avt.png"
                alt=""
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex flex-col">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="text-background">
                    Organizer Name
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-80 bg-foreground text-background"
                  align="start"
                >
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="/images/organizer-avt.png" />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Organizer Name</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

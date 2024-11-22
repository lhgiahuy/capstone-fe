"use client";

import * as React from "react";

// import { Input } from "@/components/ui/input";
import { Clock, MapPinned } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/action/event";
import Image from "next/image";
import { Event } from "@/interface/event";
// import { Button } from "@/components/ui/button";
import ButtonApproved from "@/app/moderator/(page)/_component/button-approved";
import { formatDate } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserById } from "@/action/user";
// import "../../../style/description.css";

// import { Upload } from "lucide-react";

export default function DetailEvent({ eventId }: { eventId: string }) {
  const { data } = useQuery<Event>({
    queryKey: ["events"],
    queryFn: () => getEventById(eventId),
  });
  const { data: organizer } = useQuery({
    queryKey: ["organizer", data?.organizerId],
    queryFn: () => getUserById(data?.organizerId),
  });
  if (!data) return <></>;
  if (!data?.eventTags) return <></>;

  return (
    <div className="flex flex-col gap-8 container mb-16">
      <div className="flex gap-16">
        <div className="flex flex-col w-[32rem] gap-8">
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={
                data.posterImg.startsWith("https")
                  ? data.posterImg
                  : "/images/event-bg-3.png"
              }
              alt="event bg"
              width={400}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3>Tổ chức bởi</h3>
            <Separator />
            <div className="flex items-center py-2">
              <div className="rounded-full overflow-hidden relative p-4">
                <Image
                  src={organizer?.avatarUrl || ""}
                  alt=""
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="text-foreground">
                    {data.organizerName}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-full bg-background text-foreground"
                  align="start"
                >
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={organizer?.avatarUrl} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {organizer?.username}
                      </h4>
                      <p className="text-sm">{organizer?.email}</p>
                      {/* <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div> */}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>

        <div className="w-full bg-background flex flex-col gap-16 justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-primary uppercase text-3xl line-clamp-2">
                {data.eventName}
              </h1>
              <div className="w-full flex gap-4 flex-wrap">
                {data.eventTags.slice(0, 6).map((item, index) => (
                  <div key={index}>
                    <Badge>{item}</Badge>
                  </div>
                ))}
                {data.eventTags.length > 6 && (
                  <Badge>{`+${data.eventTags.length - 6} TAG`}</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <Clock className="text-primary" />
                <p>
                  {formatDate(data.startTime, "p, d MMMM, y")} -{" "}
                  {formatDate(data.endTime, "p, d MMMM, y")}
                </p>
              </div>
              <div className="flex gap-4">
                <MapPinned className="text-primary" />
                {data.location ? (
                  <p>{data.location}</p>
                ) : (
                  <p>{data.linkEvent}</p>
                )}
              </div>
              <div className="flex gap-4 w-full">
                <ButtonApproved eventId={eventId} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-muted-foreground">Chi tiết sự kiện</h3>
                <Separator></Separator>
                <div className="text-foreground rounded-lg w-full min-h-screen">
                  <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    className="[&_span]:inline-block [&_img]:inline-block [&_a]:text-primary [&_a]:underline [&_a]:transition[&_a]:duration-300 [&_a:hover]:text-primary/60"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8"></div>
    </div>
  );
}

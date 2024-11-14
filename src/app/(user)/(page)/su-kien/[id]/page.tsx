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
import "../../../style/description.css";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/action/user";
import FormSheet from "./_component/form-sheet";
export default function EventDetail({ params }: { params: { id: string } }) {
  const { data } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: () => getEventById(params.id),
  });
  const { data: organizer } = useQuery({
    queryKey: ["organizer", data?.organizerId],
    queryFn: () => getUserById(data?.organizerId),
  });

  if (!data) return <></>;
  return (
    <div className="flex flex-col gap-8">
      <div className="absolute w-full h-[44rem] left-0 top-0 z-[-10] opacity-70">
        <div className="relative w-full h-full">
          <Image
            src="/images/event-bg-4.png"
            alt="event bg"
            fill
            className="object-cover object-top"
          ></Image>
        </div>
      </div>
      <div className="flex h-[32rem]">
        <div className="relative w-[48rem] h-full">
          <Image
            src={
              data.thumbnailImg.startsWith("https")
                ? data.thumbnailImg
                : "/images/event-bg-3.png"
            }
            alt="event bg"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full p-12 bg-background flex flex-col gap-16 justify-between">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-primary uppercase text-2xl">
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
            </div>
          </div>
          {data.form ? (
            <FormSheet data={data}></FormSheet>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="text-lg text-secondary-background py-4"
            >
              Theo dõi
            </Button>
          )}
        </div>
      </div>
      <div className="flex gap-8">
        <div className="bg-foreground text-background rounded-lg w-full min-h-screen p-4">
          <div
            dangerouslySetInnerHTML={{ __html: data.description }}
            className="prose description"
          ></div>
        </div>
        <div className="bg-foreground text-background h-full p-4 min-w-[16rem] rounded-lg shrink-0 flex flex-col gap-4">
          <h2 className="font-semibold text-sm">Tổ chức bởi</h2>
          <Separator></Separator>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden relative p-4">
              <Image
                src={organizer?.avatarUrl || ""}
                alt=""
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="flex flex-col">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="text-background">
                    {data.organizerName}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-full bg-foreground text-background"
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
      </div>
    </div>
  );
}

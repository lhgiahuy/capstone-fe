import { Badge } from "@/components/ui/badge";
import { Event } from "@/interface/event";
import { statusMap } from "@/interface/status";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Calendar, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  data: Event;
  className?: string;
  ticketStyle?: boolean;
}

export default function EventCard({
  data,
  ticketStyle,
  className,
}: EventCardProps) {
  const statusInfo = statusMap[data.status] || {
    label: "Không xác định",
    color: "gray",
  };
  if (ticketStyle)
    return (
      <Link href={`/su-kien/${data?.eventId}`} className="w-[calc(50%-0.5rem)]">
        <div className={cn("flex h-[12rem]  items-center", className)}>
          <div className="bg-card h-full w-[12rem] p-8 flex flex-col gap-2 items-center justify-center rounded-lg">
            <h3 className="text-5xl text-primary">
              {formatDate(data?.startTime, "d")}
            </h3>
            <p className="capitalize"> {formatDate(data?.startTime, "MMMM")}</p>
          </div>
          <div className="h-full border-2 border-card border-dashed relative">
            <div className="w-4 h-4 rounded-full bg-background absolute bottom-[-0.5rem] left-[-0.5rem]" />
            <div className="w-4 h-4 rounded-full bg-background absolute top-[-0.5rem] left-[-0.5rem]" />
          </div>
          <div className="bg-card w-full p-8 h-full rounded-lg flex flex-col justify-between">
            <h3 className="text-primary uppercase line-clamp-2">
              {data.eventName}
            </h3>

            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center">
                <Calendar className="h-4 w-4 text-primary" />
                <p className="capitalize font-light text-sm">
                  {formatDate(data?.startTime, "p, d MMMM, y")}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <MapPinned className="text-primary h-4 w-4 shrink-0" />
                <p className="capitalize font-light text-sm line-clamp-2">
                  {data.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  return (
    <Link
      href={`/su-kien/${data?.eventId}`}
      className={cn("flex w-full flex-col h-full gap-4", className)}
    >
      <div className="relative w-full min-w-[16rem] shrink-0 min-h-[12rem] rounded-lg overflow-hidden">
        <Image
          src={
            data.thumbnailImg.startsWith("https")
              ? data.thumbnailImg
              : "/images/auth-bg.jpg"
          }
          alt="event"
          fill
          className="object-cover object-top"
        />
        <Badge className={`${statusInfo.color} z-10 absolute top-4 right-4`}>
          {statusInfo.label}
        </Badge>
      </div>
      <div className="flex flex-col uppercase gap-4 h-full">
        <div className="flex flex-col gap-2">
          <div className="line-clamp-2">{data?.eventName}</div>
          <div className="flex gap-2 flex-wrap">
            {data?.eventTags.slice(0, 3).map((item, index) => (
              <Badge key={index} className="text-xs">
                {item}
              </Badge>
            ))}
            {data?.eventTags.length && data?.eventTags.length > 3 && (
              <Badge className="text-xs">
                {`+${data?.eventTags.length - 3} tag`}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Calendar className="h-4 w-4 text-primary" />
          <div className="capitalize font-light text-sm">
            {formatDate(data?.startTime)}
          </div>
        </div>
      </div>
    </Link>
  );
}

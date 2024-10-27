import { Event } from "@/interface/event";
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
  if (ticketStyle)
    return (
      <div className="flex h-[12rem] w-[32rem] items-center">
        <div className="bg-card h-full w-[12rem] p-8 flex flex-col gap-2 items-center justify-center rounded-lg">
          <h3 className="text-5xl text-primary">
            {" "}
            {formatDate(data?.startTime, "d")}
          </h3>
          <p className="capitalize"> {formatDate(data?.startTime, "MMMM")}</p>
        </div>
        <div className="h-full border-2 border-card border-dashed relative">
          <div className="w-4 h-4 rounded-full bg-background absolute bottom-[-0.5rem] left-[-0.5rem]" />
          <div className="w-4 h-4 rounded-full bg-background absolute top-[-0.5rem] left-[-0.5rem]" />
        </div>
        <div className="bg-card w-full p-8 h-full rounded-lg flex flex-col justify-between">
          <h3 className="text-primary uppercase">{data.eventName}</h3>
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <Calendar className="h-4 w-4 text-primary" />
              <p className="capitalize font-light text-sm">
                {formatDate(data?.startTime, "p, d MMMM, y")}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <MapPinned className="text-primary h-4 w-4" />
              <p className="capitalize font-light text-sm">{data.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <Link
      href={`/su-kien/${data?.eventId}`}
      className={cn("flex w-full flex-col h-64 gap-2", className)}
    >
      <div className="relative w-full min-w-[16rem] h-full rounded-lg overflow-hidden">
        <Image
          src="/images/auth-bg.jpg"
          alt="event"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col uppercase">
        <div>{data?.eventName}</div>
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

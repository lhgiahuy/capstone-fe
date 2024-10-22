import dateFormat from "@/lib/dateFormat";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  data: any;
  className?: string;
}

export default function EventCard({ data, className }: EventCardProps) {
  return (
    <Link href="#" className={cn("flex w-full flex-col h-64 gap-2", className)}>
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src="/images/auth-bg.jpg"
          alt="event"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>{data?.eventName.toUpperCase()}</div>
        <div className="flex gap-2 items-center">
          <Calendar className="h-4 w-4 text-primary" />
          <div className="capitalize font-light text-sm">
            {dateFormat(data?.startTime)}
          </div>
        </div>
      </div>
    </Link>
  );
}

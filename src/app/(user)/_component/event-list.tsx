"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { getEvent } from "@/action/event";
import { Event } from "@/interface/event";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface EventListProps {
  title?: string;
}

export default function EventList({ title }: EventListProps) {
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: getEvent,
  });
  return (
    <section className="flex flex-col gap-8">
      <div className="flex w-full justify-between items-center">
        {title ? (
          <div className="text-primary font-semibold text-4xl">{title}</div>
        ) : (
          <></>
        )}
        <Link href="#">
          <div className="flex gap-2 text-primary">
            Xem thêm <ChevronRight />
          </div>
        </Link>
      </div>

      <div className="flex w-full gap-4 flex-wrap">
        {data?.items.map((item: Event) => (
          <EventCard
            key={item.eventId}
            data={item}
            className="basis-[calc(33%-0.5rem)]"
          />
        ))}
      </div>
    </section>
  );
}

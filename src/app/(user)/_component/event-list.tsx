"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { getEventType } from "@/action/event";
import { Event } from "@/interface/event";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MonthSelect from "@/components/my-ui/month-select";
import { MultiSelect } from "@/components/ui/multi-select";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
interface EventListProps {
  title?: string;
  filter?: boolean;
  data?: {
    items: Event[];
  };
  ticketStyle?: boolean;
  vertical?: boolean;
  event?: Event[];
}

export default function EventList({
  data,
  title,
  filter,
  ticketStyle,
  vertical,
  event,
}: EventListProps) {
  const { data: type } = useQuery({
    queryKey: ["event-type"],
    queryFn: getEventType,
  });
  const searchParam = useSearchParams();
  const types = searchParam
    .getAll("type")
    .flatMap((item) => item.split(","))
    .filter((item) => item !== "");
  const [addParam] = useSearchParamsHandler();
  const month = searchParam.get("InMonth")?.toString();
  const handleTagFilter = (values: string[]) => {
    addParam({ EventTypes: values.toString() });
  };
  const handleMonthFilter = (value: string) => {
    addParam({ InMonth: value });
  };

  if (!type) return <></>;
  // if (!data && !event) return <></>;
  else
    return (
      <section className="flex flex-col gap-8">
        <div className="flex w-full justify-between items-center">
          {title ? (
            <div
              className={`text-primary font-semibold ${
                filter ? "" : "text-4xl"
              }`}
            >
              {title}
            </div>
          ) : (
            <></>
          )}
          {filter ? (
            <div className="flex gap-4">
              <MonthSelect
                value={month}
                onValueChange={handleMonthFilter}
                all
              />
              <MultiSelect
                options={type}
                onValueChange={handleTagFilter}
                defaultValue={types}
                placeholder="Bộ lọc"
                animation={2}
                maxCount={3}
                className="bg-primary text-background"
              />
            </div>
          ) : !vertical ? (
            <Link href={`/su-kien`}>
              <div className="flex gap-2 text-primary">
                Xem thêm <ChevronRight />
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {data ? (
          <div className="flex w-full gap-4 gap-y-8 flex-wrap">
            {data?.items.map((item: Event) => (
              <EventCard
                key={item.eventId}
                data={item}
                className="basis-[calc(33%-0.5rem)]"
                ticketStyle={ticketStyle}
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full gap-4 gap-y-8 flex-wrap">
            {event?.map((item: Event) => (
              <EventCard
                key={item.eventId}
                data={item}
                className="basis-[calc(33%-0.5rem)]"
                ticketStyle={ticketStyle}
              />
            ))}
          </div>
        )}
      </section>
    );
}

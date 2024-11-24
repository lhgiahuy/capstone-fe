"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { getEventType } from "@/action/event";
import { Event } from "@/interface/event";
import { CalendarX2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import MonthSelect from "@/components/my-ui/month-select";
import { MultiSelect } from "@/components/ui/multi-select";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
import YearSelect from "@/components/my-ui/year-select";
import { cn } from "@/lib/utils";
interface EventListProps {
  title?: string;
  filter?: boolean;
  data?: {
    items: Event[];
  };
  ticketStyle?: boolean;
  vertical?: boolean;
  event?: Event[];
  className?: string;
  cardClassName?: string;
}

export default function EventList({
  data,
  title,
  filter,
  ticketStyle,
  vertical,
  event,
  className,
  cardClassName,
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
  const year = searchParam.get("InYear")?.toString();
  const handleTagFilter = (values: string[]) => {
    addParam({ EventTypes: values.toString() });
  };
  const handleMonthFilter = (value: string) => {
    addParam({ InMonth: value });
  };
  const handleYearFilter = (value: string) => {
    addParam({ InYear: value });
  };
  if (!type) return <></>;
  else
    return (
      <section className={cn("flex flex-col gap-8", className)}>
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
              <YearSelect value={year} onValueChange={handleYearFilter} all />
              <MultiSelect
                options={type}
                onValueChange={handleTagFilter}
                defaultValue={types}
                placeholder="Bộ lọc"
                animation={2}
                maxCount={10}
                className="bg-primary text-background"
              />
            </div>
          ) : !vertical ? (
            // <Link href={`/su-kien`}>
            //   <div className="flex gap-2 text-primary">
            //     Xem thêm <ChevronRight />
            //   </div>
            //   </Link>
            <></>
          ) : (
            <></>
          )}
        </div>

        {data?.items.length ? (
          <div className="flex w-full gap-4 gap-y-8 flex-wrap">
            {data?.items.map((item: Event) => (
              <EventCard
                key={item.eventId}
                data={item}
                className={cn("basis-[calc(33%-0.5rem)]", cardClassName)}
                ticketStyle={ticketStyle}
              />
            ))}
          </div>
        ) : event?.length ? (
          <div className="flex w-full gap-4 gap-y-8 flex-wrap">
            {event?.map((item: Event) => (
              <EventCard
                key={item.eventId}
                data={item}
                className={cn("basis-[calc(33%-0.5rem)]", cardClassName)}
                ticketStyle={ticketStyle}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4 items-center min-w-[32rem] min-h-[12rem] justify-center">
            <CalendarX2 className="h-16 w-16 text-primary" />
            {title ? (
              <h3 className="text-primary text-lg">{`Không có ${title.toLowerCase()}`}</h3>
            ) : (
              <h3 className="text-primary text-lg">{`Không có sự kiện`}</h3>
            )}
          </div>
        )}
      </section>
    );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { getEventType } from "@/action/event";
import { Event } from "@/interface/event";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import useAddSearchParam from "@/hooks/use-add-search-param";
import { useSearchParams } from "next/navigation";
import MonthSelect from "@/components/my-ui/month-select";
interface EventListProps {
  title?: string;
  filter?: boolean;
  data: {
    items: Event[];
  };
  ticketStyle?: boolean;
  vertical?: boolean;
}

export default function EventList({
  data,
  title,
  filter,
  ticketStyle,
  vertical,
}: EventListProps) {
  const { data: type } = useQuery({
    queryKey: ["event-type"],
    queryFn: getEventType,
  });
  const searchParam = useSearchParams();
  // const types = searchParam
  //   .getAll("type")
  //   .flatMap((item) => item.split(","))
  //   .filter((item) => item !== "");
  const addParam = useAddSearchParam();
  const month = searchParam.get("thang")?.toString();
  // const handleTagFilter = (values: string[]) => {
  //   addParam({ EventTypes: values.toString() });
  // };
  const handleMonthFilter = (value: string) => {
    addParam({ InMonth: value });
  };

  if (!type) return <></>;
  // if (!data) return <Loader2 className="mr-2 h-16 w-16 animate-spin" />;
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
              <MonthSelect value={month} onValueChange={handleMonthFilter} />
              {/* <MultiSelect
                options={type}
                onValueChange={handleTagFilter}
                defaultValue={types}
                placeholder="Bộ lọc"
                animation={2}
                maxCount={3}
                className="bg-primary text-background"
              /> */}
            </div>
          ) : !vertical ? (
            <Link href="#">
              <div className="flex gap-2 text-primary">
                Xem thêm <ChevronRight />
              </div>
            </Link>
          ) : (
            <></>
          )}
        </div>

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
      </section>
    );
}

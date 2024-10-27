"use client";

import { useQuery } from "@tanstack/react-query";
import EventCard from "./event-card";
import { getTag } from "@/action/event";
import { Event } from "@/interface/event";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
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
  const { data: tag } = useQuery({ queryKey: ["tag"], queryFn: getTag });
  const searchParam = useSearchParams();
  const tags = searchParam
    .getAll("tag")
    .flatMap((tag) => tag.split(","))
    .filter((tag) => tag !== "");
  const addParam = useAddSearchParam();
  const month = searchParam.get("thang")?.toString();
  const handleTagFilter = (values: string[]) => {
    addParam({ tag: values.toString() });
  };
  const handleMonthFilter = (value: string) => {
    addParam({ thang: value });
  };

  if (!tag) return <></>;
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
              <MultiSelect
                options={tag}
                onValueChange={handleTagFilter}
                defaultValue={tags}
                placeholder="Bộ lọc"
                animation={2}
                maxCount={3}
                className="bg-primary text-background"
              />
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

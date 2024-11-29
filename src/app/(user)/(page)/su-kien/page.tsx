"use client";

import EventList from "../../_component/event-list";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/action/event";
import MyPagination from "@/components/table/my-pagination";

export default function Event() {
  const searchParams = useSearchParams();
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "") || 1;
  const searchString = searchParams.get("tu-khoa")?.toString() || "";
  const month =
    parseInt((searchParams.get("InMonth") || "").replace("Tháng ", ""), 10) ||
    undefined;
  const year = parseInt(searchParams.get("InYear") || "", 10) || undefined;
  const types = searchParams
    .getAll("EventTypes")
    .flatMap((item) => item.split(","))
    .filter((item) => item !== "");
  const tag = searchParams.get("EventTag")?.toString();
  const { data } = useQuery({
    queryKey: ["events", searchString, month, types, tag, year, currentPage],
    queryFn: () =>
      getEvent({
        SearchKeyword: searchString,
        InMonth: month,
        EventTypes: types,
        EventTag: tag,
        InYear: year,
        PageNumber: currentPage,
      }),
  });

  return (
    <div className="flex flex-col gap-16">
      <EventList
        className="min-h-screen"
        data={data}
        title={`Kết quả tìm kiếm: ${searchString}`}
        filter
      />
      <MyPagination totalPages={data?.totalPages} />
    </div>
  );
}

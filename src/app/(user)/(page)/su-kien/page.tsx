"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EventList from "../../_component/event-list";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/action/event";

export default function Event() {
  const searchParams = useSearchParams();
  const searchString = searchParams.get("tu-khoa")?.toString() || "";
  const month =
    parseInt((searchParams.get("thang") || "").replace("Tháng ", ""), 10) ||
    undefined;
  const { data } = useQuery({
    queryKey: ["events", searchString, month],
    queryFn: () => getEvent({ SearchKeyword: searchString, inMonth: month }),
  });
  return (
    <div className="flex flex-col gap-16">
      <EventList
        data={data}
        title={`Kết quả tìm kiếm: ${searchString}`}
        filter
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

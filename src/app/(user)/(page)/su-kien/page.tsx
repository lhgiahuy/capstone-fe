"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import EventList from "../../_component/event-list";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/action/event";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Event() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchParamsPaging = useSearchParams();
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "") || 1;
  const searchString = searchParams.get("tu-khoa")?.toString() || "";
  const month =
    parseInt((searchParams.get("InMonth") || "").replace("Tháng ", ""), 10) ||
    undefined;
  const types = searchParams
    .getAll("type")
    .flatMap((item) => item.split(","))
    .filter((item) => item !== "");
  const tag = searchParams.get("EventTag")?.toString();
  const { data } = useQuery({
    queryKey: ["events", searchString, month, types, tag],
    queryFn: () =>
      getEvent({
        SearchKeyword: searchString,
        InMonth: month,
        EventTypes: types,
        EventTag: tag,
      }),
  });

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= data?.totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${pathname}?${new URLSearchParams({
              ...Object.fromEntries(searchParamsPaging),
              PageNumber: i.toString(),
            }).toString()}`}
            isActive={i == currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };
  return (
    <div className="flex flex-col gap-16">
      <EventList
        data={data}
        title={`Kết quả tìm kiếm: ${searchString}`}
        filter
      />
      <Pagination>
        <PaginationContent className="items-center">
          <PaginationItem>
            <Button
              onClick={() =>
                router.push(
                  `${pathname}?${new URLSearchParams({
                    ...Object.fromEntries(searchParamsPaging),
                    PageNumber: `${(
                      parseInt(currentPage.toString()) - 1
                    ).toString()}`,
                  }).toString()}`
                )
              }
              disabled={currentPage == 1}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft />
            </Button>
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <Button
              onClick={() =>
                router.push(
                  `${pathname}?${new URLSearchParams({
                    ...Object.fromEntries(searchParamsPaging),
                    PageNumber: `${(
                      parseInt(currentPage.toString()) + 1
                    ).toString()}`,
                  }).toString()}`
                )
              }
              disabled={currentPage == data?.totalPages}
              size="icon"
              variant="ghost"
            >
              <div className="flex gap-2 items-center">
                <ChevronRight />
              </div>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

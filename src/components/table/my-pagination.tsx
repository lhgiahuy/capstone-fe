"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

export default function MyPagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = parseInt(
    searchParams.get("PageNumber")?.toString() || "1",
    10
  );

  const updatePage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("PageNumber", page.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return (
        <PaginationItem key={page}>
          <PaginationLink
            href={`${pathname}?${new URLSearchParams({
              ...Object.fromEntries(searchParams),
              PageNumber: page.toString(),
            }).toString()}`}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <Pagination>
      <PaginationContent className="items-center">
        {/* Previous Button */}
        <PaginationItem>
          <Button
            onClick={() => updatePage(currentPage - 1)}
            disabled={currentPage === 1}
            size="icon"
            variant="ghost"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <PaginationItem>
          <Button
            onClick={() => updatePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            size="icon"
            variant="ghost"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";
// import { User } from "@/interface/user";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { parseISO } from "date-fns";
import { getAllEvent } from "@/action/event";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavBar from "../_component/moderator-navbar";
import { getFirstLetterOfName } from "@/lib/utils";
import { Event } from "@/interface/event";
import { formatDate } from "@/lib/date";
import { useRouter } from "next/navigation";

export default function EventDetail() {
  const [statusFilter, setStatusFilter] = useState<string>("underReview");
  const { data, isPending } = useQuery({
    queryKey: ["events", statusFilter],
    queryFn: () => getAllEvent({ Status: statusFilter }),
  });
  const router = useRouter();
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "eventName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên sự kiện
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-64 flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.thumbnailImg} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.eventName)}
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-2">{row.original.eventName}</p>
        </div>
      ),
    },

    {
      accessorKey: "organizerName",
      header: "Người tổ chức",
    },

    {
      accessorKey: "startTime",
      header: "Ngày bắt đầu",
      cell: ({ row }) => {
        return <div>{formatDate(row.original.startTime)}</div>;
      },
    },
    {
      accessorKey: "endTime",
      header: "Ngày kết thúc",
      cell: ({ row }) => {
        return <div>{formatDate(row.original.startTime)}</div>;
      },
    },

    {
      accessorKey: "maxAttendees",
      header: "Số người tham gia",
      cell: ({ row }) => {
        return <div>{row.original.maxAttendees || "chưa có dữ liệu"}</div>;
      },
    },

    {
      accessorKey: "status",
      header: () => {
        return (
          <div className="flex items-center">
            <div>Trạng thái</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chọn trạng thái</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setStatusFilter("")}>
                  Tất cả
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
                  Sắp tới
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("underReview")}
                >
                  Chờ xác thực
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Hoàn thành
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="w-[6rem] flex justify-center">
            <Button
              variant={"link"}
              onClick={() =>
                router.push(
                  `/moderator/quan-ly-su-kien/${row.original.eventId}`
                )
              }
            >
              Xem thông tin
            </Button>
          </div>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];
  const hideColumns = ["isDeleted", "deletedAt"];
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/moderator/quan-ly-su-kien" },
        ]}
      />{" "}
      <div className="">
        {isPending ? (
          <></>
        ) : (
          <DataTable
            hideColumns={hideColumns}
            columns={columns}
            data={data.items}
          />
        )}
      </div>
    </>
  );
}

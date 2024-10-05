"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/app/action/getEvent";
import { Events } from "@/app/types/events.type";

export function EventManagement() {
  const { data } = useQuery<Events[]>({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  });
  console.log(data);

  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sự kiện</SelectLabel>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="approved">Được duyệt</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="Cancelled">Hủy</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Table className="bg-white rounded-sm  mt-2">
        <TableCaption>Danh sách sự kiện.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tên sự kiện</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Ngày diễn ra</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((event) => (
            <TableRow key={event.eventId}>
              <TableCell className="font-medium">
                <Link href="/moderator/duyet-su-kien">
                  <div className="w-32 h-32 rounded-md bg-slate-300"></div>
                </Link>
              </TableCell>
              <TableCell>{event.eventName}</TableCell>
              <TableCell>{event.location}</TableCell>

              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    event.paymentStatus === "Được duyệt"
                      ? "bg-green-400 hover:bg-green-400"
                      : event.paymentStatus === "Đang chờ"
                      ? "bg-yellow-200 hover:bg-yellow-200"
                      : "bg-slate-400 hover:bg-slate-400",
                    "cursor-default"
                  )}
                >
                  {event.paymentStatus === "Được duyệt"
                    ? "Được duyệt"
                    : event.paymentStatus === "Đang chờ"
                    ? "Đang chờ"
                    : "Không được duyệt"}
                </Badge>
              </TableCell>
              {/* <TableCell className="text-right">{event.totalAmount}</TableCell> */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

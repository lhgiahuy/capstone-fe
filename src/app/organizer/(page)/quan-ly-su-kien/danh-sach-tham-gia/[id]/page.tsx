"use client";
import { getParticipant, getSubmittedFormData } from "@/action/event";
import { DataTable } from "@/components/table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/interface/user";
import { getFirstLetterOfName } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, X } from "lucide-react";
import Link from "next/link";
import NavBar from "../../../_component/navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isPending } = useQuery({
    queryKey: ["participants", params.id],
    queryFn: () => getParticipant(params.id),
  });
  const [userId, setUserId] = useState("");
  const { data: formData } = useQuery({
    queryKey: ["form", params.id, userId],
    queryFn: () => getSubmittedFormData(params.id, userId),
  });
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên người dùng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-full flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.username)}
            </AvatarFallback>
          </Avatar>
          <p>{row.original.username}</p>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex pl-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex pl-0"
          >
            Số điện thoại <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) =>
        row.original.phoneNumber ? <p>{row.original.phoneNumber}</p> : "N/A",
    },
    {
      accessorKey: "cardUrl",
      header: "Thẻ sinh viên",
      cell: ({ row }) =>
        row.original.cardUrl ? (
          <Link
            href={row.original.cardUrl}
            className="text-primary hover:text-primary/80"
          >
            Xem thẻ
          </Link>
        ) : (
          <p>Chưa có thẻ</p>
        ),
    },
    {
      accessorKey: "isCheckin",
      header: "Check in",
      cell: ({ row }) => {
        return (
          <div className="flex px-4">
            {row.original.isCheckin ? (
              <Check className="text-green-400 center"></Check>
            ) : (
              <X className="text-red-400"></X>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Sheet>
            <SheetTrigger asChild>
              <div className="w-[6rem] pl-6 flex justify-center">
                <Button
                  variant={"link"}
                  onClick={() => setUserId(row.original.userId)}
                >
                  Xem form đăng ký
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary text-3xl">
                  Form đăng ký
                </SheetTitle>
                <div className="flex flex-col gap-8 py-8">
                  {formData?.data.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div>{item.question}</div>
                      <Input value={item.answer}></Input>
                    </div>
                  ))}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        );
      },
    },
  ];
  const hideColumns = ["isDeleted", "deletedAt"];
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Danh sách người tham gia",
            link: "#",
          },
        ]}
      />
      {isPending ? (
        <></>
      ) : (
        <DataTable hideColumns={hideColumns} columns={columns} data={data} />
      )}
    </>
  );
}

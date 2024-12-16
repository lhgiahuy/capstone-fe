"use client";
import {
  CheckIn,
  getEventById,
  getParticipant,
  getSubmittedFormData,
} from "@/action/event";
import { DataTable } from "@/components/table/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/interface/user";
import { getFirstLetterOfName } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import NavBar from "../../../_component/navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Event } from "@/interface/event";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("SearchKeyword")?.toString() || "";
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "1", 10) || 1;
  const { data } = useQuery({
    queryKey: ["participants", params.id, searchKeyword, currentPage],
    queryFn: () =>
      getParticipant({
        eventId: params.id,
        SearchKeyword: searchKeyword,
        PageNumber: currentPage,
      }),
  });
  const [userId, setUserId] = useState("abc");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Fetch the form data based on userId only when the userId is available
  const { data: formData } = useQuery({
    queryKey: ["form", params.id, userId],
    queryFn: () => getSubmittedFormData(params.id, userId),
  });

  const handleOpenSheet = (userId: string) => {
    setUserId(userId); // Set the userId first
    setSheetOpen(true); // Then open the sheet
  };

  const { data: event } = useQuery<Event>({
    queryKey: ["event", params.id],
    queryFn: () => getEventById(params.id),
  });
  const query = useQueryClient();
  const { mutate: checkInMutation } = useMutation({
    mutationFn: ({ eventId, userId }: { eventId: string; userId: string }) =>
      CheckIn(eventId, userId),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["participants", params.id] });
    },
  });
  const handleCheckIn = (userId: string) => {
    checkInMutation(
      { eventId: params.id, userId: userId },
      {
        onSuccess: () => {
          toast("Check in thành công!");
        },
        onError: () => {
          toast("Check in thất bại!");
        },
      }
    );
  };
  const handleCancelCheckIn = (userId: string) => {
    checkInMutation(
      { eventId: params.id, userId: userId },
      {
        onSuccess: () => {
          toast("Huỷ check in thành công!");
        },
        onError: () => {
          toast("Huỷ check in thất bại!");
        },
      }
    );
  };
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
      accessorKey: "studentId",
      header: "MSSV",
      cell: ({ row }) => {
        return <div>{row.original.studentId || "Không có dữ liệu"}</div>;
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
        row.original.phoneNumber ? (
          <p>{row.original.phoneNumber}</p>
        ) : (
          "Không có dữ liệu."
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
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Thực hiện</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {event?.form.length ? (
                  <DropdownMenuItem
                    onClick={() => {
                      handleOpenSheet(row.original.userId); // Open the sheet after setting userId
                    }}
                  >
                    Xem form đăng ký
                  </DropdownMenuItem>
                ) : (
                  <></>
                )}
                <DropdownMenuItem
                  onClick={() =>
                    row.original.isCheckin
                      ? handleCancelCheckIn(row.original.userId)
                      : handleCheckIn(row.original.userId)
                  }
                >
                  {row.original.isCheckin ? (
                    <p>Huỷ check in</p>
                  ) : (
                    <p>Check in</p>
                  )}
                </DropdownMenuItem>
                {row.original.cardUrl.startsWith("https://firebase") && (
                  <DropdownMenuItem>
                    <Link href={row.original.cardUrl}>Xem thẻ sinh viên</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-primary text-3xl">
                  Form đăng ký
                </SheetTitle>
                {formData ? (
                  <div className="flex flex-col gap-8 py-8">
                    {formData?.data.map((item: any, index: number) => (
                      <div key={index} className="flex flex-col gap-2">
                        <div>{item.question}</div>
                        <Input defaultValue={item.answer}></Input>
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        );
      },
    },
  ];
  const hideColumns = ["isDeleted", "deletedAt"];
  // const selectOptions = [
  //   {
  //     option: [
  //       { name: "Đã check in", value: "true" },
  //       { name: "Chưa check in", value: "false" },
  //     ],
  //     placeholder: "Check in",
  //     title: "isCheckin",
  //     defaultValue: "true",
  //   },
  // ];
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
          {
            title: "Chi tiết sự kiện",
            link: `/organizer/quan-ly-su-kien/${params.id}`,
          },
          {
            title: "Danh sách người tham gia",
            link: "#",
          },
        ]}
      />

      <DataTable
        hideColumns={hideColumns}
        columns={columns}
        data={data?.items}
        // selectOptions={selectOptions}
        totalPages={data?.totalPages}
      />
    </>
  );
}

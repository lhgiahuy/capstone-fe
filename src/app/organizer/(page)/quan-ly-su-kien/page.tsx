"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";
// import { User } from "@/interface/user";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { parseISO } from "date-fns";
import { deleteEvent, getEventByOrganizerPrivate } from "@/action/event";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atom/user";
import NavBar from "../_component/navbar";
import Image from "next/image";
import { Event } from "@/interface/event";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { formatDate } from "@/lib/date";
import QRCode from "qrcode";

export default function EventTable() {
  const [user] = useAtom(userAtom);
  const searchParams = useSearchParams();
  const status = searchParams.get("status")?.toString() || "Upcoming";
  const searchKeyword = searchParams.get("SearchKeyword")?.toString() || "";
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "1", 10) || 1;
  const query = useQueryClient();
  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () =>
      query.invalidateQueries({ queryKey: ["events", user?.userId, status] }),
  });
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["events", user?.userId, status, searchKeyword, currentPage],
    queryFn: () =>
      getEventByOrganizerPrivate({
        UserId: user?.userId,
        Status: status,
        SearchKeyword: searchKeyword,
        PageNumber: currentPage,
      }),
  });
  const handleDelete = (id: string) => {
    deleteEventMutation(id, { onSuccess: () => toast("Xoá event thành công") });
  };
  const handleGenerateQR = async (eventId: string) => {
    try {
      const qrSrc = await QRCode.toDataURL(`${eventId}`);
      router.push(`/organizer/qr-check-in?qr=${encodeURIComponent(qrSrc)}`);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  const columns: ColumnDef<Event>[] = [
    // {
    //   accessorKey: "thumbnailImg",
    //   header: "Thumbnail",
    //   cell: ({ row }) => {
    //     return (
    //       <Image
    //         src={row.original.thumbnailImg || "/images/auth-bg.jpg"}
    //         alt=""
    //         width={100}
    //         height={300}
    //       ></Image>
    //     );
    //   },
    // },
    {
      accessorKey: "posterImg",
      header: "Poster",
      cell: ({ row }) => {
        return (
          <>
            {row.original.posterImg.startsWith("https://firebasestorage") ? (
              <Image
                src={row.original.posterImg}
                alt=""
                width={100}
                height={300}
              ></Image>
            ) : (
              <Image
                src={"/images/image-placeholder-portrait.jpg"}
                alt=""
                width={100}
                height={300}
              ></Image>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "eventName",
      header: "Tên sự kiện",
      cell: ({ row }) => {
        return (
          <Link
            href={`/organizer/quan-ly-su-kien/${row.original.eventId}`}
            className="line-clamp-2 max-w-[12rem]"
          >
            {row.original.eventName}
          </Link>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      cell: ({ row }) => {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: row.original.description }}
            className="line-clamp-3 max-w-[18rem]"
          ></div>
        );
      },
    },
    {
      accessorKey: "eventTypeName",
      header: "Loại",
    },
    {
      accessorKey: "maxAttendees",
      header: "Số người tham gia",
      cell: ({ row }) => {
        return row.original.maxAttendees ? (
          <p>{row.original.maxAttendees}</p>
        ) : (
          <p>Không có dữ liệu</p>
        );
      },
    },
    // {
    //   accessorKey: "proposal",
    //   header: "Proposal",
    //   cell: ({ row }) => {
    //     return <p>{row.original.proposal}</p>;
    //   },
    // },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        return <Badge> {row.original.status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <AlertDialog>
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
                <DropdownMenuItem>
                  <Link
                    href={`/organizer/quan-ly-su-kien/${row.original.eventId}`}
                  >
                    Thông tin sự kiện
                  </Link>
                </DropdownMenuItem>
                {row.original.status !== "Draft" &&
                  row.original.status !== "UnderReview" && (
                    <DropdownMenuItem>
                      <Link
                        href={`/organizer/quan-ly-su-kien/danh-sach-tham-gia/${row.original.eventId}`}
                      >
                        Danh sách người tham dự
                      </Link>
                    </DropdownMenuItem>
                  )}
                {(row.original.status === "InProgress" ||
                  row.original.status === "Upcoming") && (
                  <DropdownMenuItem
                    onClick={() => handleGenerateQR(row.original.eventId)}
                  >
                    Tạo mã QR
                  </DropdownMenuItem>
                )}
                {row.original.status === "Draft" && (
                  <DropdownMenuItem>Chỉnh sửa sự kiện</DropdownMenuItem>
                )}
                {row.original.status === "Draft" && (
                  <DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                      <p>Xoá sự kiện</p>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có muốn xoá sự kiện?</AlertDialogTitle>
                <AlertDialogDescription>
                  Thao tác này không thể hoàn tác. Sự kiện sẽ bị xoá vĩnh viễn
                  và không thể khôi phục.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Đóng</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.original.eventId)}
                >
                  Xoá
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];

  const hideColumns = ["isDeleted", "deletedAt"];
  const selectOptions = [
    {
      option: [
        { name: "Tất cả", value: "All" },
        { name: "Sắp diễn ra", value: "Upcoming" },
        { name: "Đã kết thúc", value: "Completed" },
        { name: "Nháp", value: "Draft" },
        { name: "Đang diễn ra", value: "InProgress" },
        { name: "Đang chờ duyệt", value: "UnderReview" },
      ],
      placeholder: "Status",
      title: "status",
      defaultValue: status,
    },
  ];
  return (
    <>
      <NavBar
        breadcrumb={[
          { title: "Quản lý sự kiện", link: "/organizer/quan-ly-su-kien" },
        ]}
      />
      <>
        <DataTable
          hideColumns={hideColumns}
          columns={columns}
          data={data?.items}
          selectOptions={selectOptions}
          totalPages={data?.totalPages}
        />
      </>
    </>
  );
}

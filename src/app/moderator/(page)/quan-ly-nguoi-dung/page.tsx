"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"; // Import useState từ React
import { approveVerifyUser, getUser } from "@/action/user";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFirstLetterOfName } from "@/lib/utils";
import { DataTable } from "@/components/table/data-table";
import { User } from "@/interface/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { parseISO } from "date-fns";
import NavBar from "../_component/moderator-navbar";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ManagementUser() {
  const searchParams = useSearchParams();
  const currentPage =
    parseInt(searchParams.get("PageNumber")?.toString() || "") || 1;
  const role = searchParams.get("role") || "Student";
  const verified = searchParams.get("verified")?.toString() || "UnderVerify";
  const searchKeyword = searchParams.get("SearchKeyword")?.toString() || "";
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [processNote, setProcessNote] = useState("");
  const { data } = useQuery({
    queryKey: ["user", currentPage, role, verified, searchKeyword],
    queryFn: () =>
      getUser({
        PageNumber: currentPage,
        roleName: role,
        Verified: verified,
        Username: searchKeyword,
      }),
  });
  const query = useQueryClient();
  const approveMutation = useMutation({
    mutationFn: ({
      userId,
      approved,
      note,
    }: {
      userId: string;
      approved: boolean;
      note: string;
    }) => approveVerifyUser(userId, approved, note),
    onSuccess: () => {
      setIsSheetOpen(false);
      query.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên người dùng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="w-64 flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatarUrl} alt="user avatar" />
            <AvatarFallback>
              {getFirstLetterOfName(row.original.username)}
            </AvatarFallback>
          </Avatar>
          <p className="line-clamp-2">{row.original.username}</p>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },

    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
    },

    {
      accessorKey: "studentId",
      header: "MSSV",
      cell: ({ row }) => {
        return <div>{row.original.studentId || "Không có dữ liệu"}</div>;
      },
    },
    {
      accessorKey: "verified",
      header: "Xác thực",
      cell: ({ row }) => (
        <Badge
          className={`${
            row.original.verified === "Verified"
              ? "bg-green-400"
              : row.original.verified === "UnderVerify"
              ? "bg-orange-600 text-foreground"
              : "bg-red-800 text-foreground"
          }`}
        >{`${
          row.original.verified === "Verified"
            ? "Đã xác thực"
            : row.original.verified === "UnderVerify"
            ? "Đang chờ xác thực"
            : "Chưa xác thực"
        }
`}</Badge>
      ),
    },
    {
      accessorKey: "roleName",
      header: "Vai trò",
      cell: ({ row }) => (
        <Badge
          className={cn(
            row.original.roleName === "admin"
              ? "bg-blue-400 hover:bg-blue-400"
              : row.original.roleName === "manager"
              ? "bg-orange-400 hover:bg-orange-400"
              : "bg-primary",
            "capitalize"
          )}
        >
          {row.original.roleName}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => parseISO(row.original.createdAt).toUTCString(),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) =>
        row.original.updatedAt
          ? parseISO(row.original.updatedAt).toUTCString()
          : "N/A", // Format date or show N/A if null
    },
    {
      accessorKey: "isDeleted",
      header: "Deleted",
      cell: ({ row }) => (row.original.isDeleted ? "Có" : "Không"), // Show Yes/No for boolean
    },
    {
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ row }) =>
        row.original.deletedAt
          ? parseISO(row.original.deletedAt).toUTCString()
          : "N/A", // Format date or show N/A if null
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        if (user.verified !== "UnderVerify") return <></>;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Sao chép email người dùng
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {row.original.verified === "UnderVerify" && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(user);
                    setIsSheetOpen(true);
                  }}
                >
                  Xác thực người dùng
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Link href={row.original.cardUrl}>
                  Xem thẻ sinh viên/nhân viên
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false, // disable hiding for this column
    },
  ];

  const hideColumns = ["createdAt", "updatedAt", "isDeleted", "deletedAt"];
  const selectOptions = [
    {
      option: [
        { name: "Tất cả", value: "All" },

        { name: "Đã xác thực", value: "Verified" },
        { name: "Chưa xác thực", value: "Unverified" },
        { name: "Đang chờ xác thực", value: "UnderVerify" },
      ],
      placeholder: "Xác thực",
      title: "verified",
      defaultValue: verified,
    },
    {
      option: [
        { name: "Sinh viên", value: "student" },
        { name: "Organizer", value: "organizer" },
      ],
      placeholder: "Vai trò",
      title: "role",
      defaultValue: role,
    },
  ];
  return (
    <>
      <NavBar
        breadcrumb={[
          {
            title: "Quản lý người dùng",
            link: "/moderator/quan-ly-nguoi-dung",
          },
        ]}
      />
      <div className="">
        <DataTable
          hideColumns={hideColumns}
          columns={columns}
          data={data?.items}
          totalPages={data?.totalPages}
          selectOptions={selectOptions}
        />
        <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
          <SheetContent className="space-y-6">
            <SheetHeader>Phê duyệt người dùng</SheetHeader>

            <div className="space-y-4">
              <Textarea
                className="w-full p-2 border rounded"
                placeholder="Ghi chú..."
                value={processNote}
                rows={4}
                onChange={(e) => setProcessNote(e.target.value)}
              />
              <div className="w-full justify-end flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedUser) {
                      approveMutation.mutate({
                        userId: selectedUser.userId,
                        approved: false,
                        note: processNote,
                      });
                    }
                  }}
                >
                  Từ chối
                </Button>
                <Button
                  onClick={() => {
                    if (selectedUser) {
                      approveMutation.mutate({
                        userId: selectedUser.userId,
                        approved: true,
                        note: processNote,
                      });
                    }
                  }}
                >
                  Đồng ý
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

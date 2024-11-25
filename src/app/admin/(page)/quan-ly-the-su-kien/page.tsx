"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import AdminNavBar from "../../_component/admin-navbar";
import { deleteTag, getTag } from "@/action/tag";
import { Tag } from "@/interface/tag";
import { formatDate } from "@/lib/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateTag from "./_component/create-tag";
import DialogDelete from "./_component/dialog-delete";
import { useState } from "react";

export default function EventTag() {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const { data, isPending } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTag(),
  });

  const deleteMutation = useMutation({
    mutationFn: (tagId: string) => deleteTag(tagId),
    onSuccess: () => {
      alert("Xóa thẻ thành công!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error) => {
      console.error("Failed to delete tag:", error);
    },
  });

  const columns: ColumnDef<Tag>[] = [
    {
      accessorKey: "tagName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tên thẻ sự kiện
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <p>{row.original.tagName}</p>
          <div
            dangerouslySetInnerHTML={{ __html: row.original.svgContent }}
            className="[&_span]:inline-block [&_img]:inline-block [&_a]:text-primary [&_a]:underline [&_a]:transition[&_a]:duration-300 [&_a:hover]:text-primary/60"
          ></div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        const formattedDate = formatDate(row.original.createdAt, "d MMMM, y");
        return <div>{formattedDate}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const tag = row.original;
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
                onClick={() => navigator.clipboard.writeText(tag.tagName)}
              >
                Sao chép tên thẻ
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTagId(tag.tagId);
                  setOpenDialog(true);
                }}
              >
                Xoá thẻ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];
  const hideColumns = ["description", "isDeleted", "deletedAt"];
  return (
    <>
      <AdminNavBar links={["Quản lý thẻ sự kiện"]} />
      <div className="mb-4 flex  items-center">
        <CreateTag />
      </div>
      <div className="">
        {isPending ? (
          <></>
        ) : (
          <DataTable hideColumns={hideColumns} columns={columns} data={data} />
        )}
      </div>
      <DialogDelete
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onDelete={() => {
          if (selectedTagId) {
            deleteMutation.mutate(selectedTagId);
          }
        }}
      />
    </>
  );
}

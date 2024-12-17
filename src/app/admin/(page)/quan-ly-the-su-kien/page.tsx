"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/table/data-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash } from "lucide-react";

import AdminNavBar from "../../_component/admin-navbar";
import { deleteTag, getTag } from "@/action/tag";
import { Tag } from "@/interface/tag";
import { formatDate } from "@/lib/date";
import DialogDelete from "./_component/dialog-delete";
import { useState } from "react";
import { toast } from "sonner";

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
      toast("Xóa thẻ thành công!");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error) => {
      toast("Xóa thẻ thất bại!");

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
          <div className="flex justify-end">
            <Button
              variant={"ghost"}
              onClick={() => {
                setSelectedTagId(tag.tagId);
                setOpenDialog(true);
              }}
            >
              <Trash className="text-muted-foreground"></Trash>
            </Button>
          </div>
        );
      },
      enableHiding: false,
    },
  ];
  const hideColumns = ["description", "isDeleted", "deletedAt"];
  return (
    <>
      <AdminNavBar breadcrumb={[{ title: "Quản lý thẻ sự kiện", link: "#" }]} />

      <div className="container max-w-[64rem] pb-16">
        {isPending ? (
          <></>
        ) : (
          <DataTable
            hideColumns={hideColumns}
            columns={columns}
            data={data}
            noFilter
          />
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

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ButtonCreateTag } from "@/interface/tag";
import { createTag } from "@/action/tag";

export default function CreateTag() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [tagName, setTagName] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const mutation = useMutation({
    mutationFn: (tag: Partial<ButtonCreateTag>) =>
      createTag(tag.svgContent as string, tag.tagName as string),
    onSuccess: (data) => {
      console.log("User updated profile successfully:", data);
      alert("Tạo thành công!");
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
    },
  });
  const handleCreate = () => {
    if (!tagName.trim() || !svgContent.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    mutation.mutate({
      svgContent,
      tagName,
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo Thẻ
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo Thẻ Mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nhập tên thẻ"
              className="w-full p-2 border rounded text-gray-600"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <textarea
              placeholder="Nhập nội dung SVG"
              className="w-full p-2 border rounded text-gray-600"
              value={svgContent}
              onChange={(e) => setSvgContent(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                handleCreate(), setOpen(false);
              }}
            >
              Tạo Thẻ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

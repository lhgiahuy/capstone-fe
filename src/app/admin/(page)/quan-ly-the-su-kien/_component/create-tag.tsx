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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreateTag() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [tagName, setTagName] = useState("");
  const [svgContent, setSvgContent] = useState("");
  const mutation = useMutation({
    mutationFn: (tag: Partial<ButtonCreateTag>) =>
      createTag(tag.svgContent as string, tag.tagName as string),
    onSuccess: () => {
      toast("Tạo thẻ thành công!");
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
    },
    onError: (error) => {
      toast("Tạo thẻ thất bại!");
      console.error("Failed to update user:", error);
    },
  });
  const handleCreate = () => {
    if (!tagName.trim() || !svgContent.trim()) {
      toast("Vui lòng nhập đầy đủ thông tin!");
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
          <Button variant={"outline"}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo Thẻ
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo Thẻ Mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nhập tên thẻ"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <Textarea
              placeholder="Nhập nội dung SVG"
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
                handleCreate(),
                  setOpen(false),
                  setTagName(""),
                  setSvgContent("");
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

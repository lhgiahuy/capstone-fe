"use client";

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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerEvent } from "@/action/event";
import { useState } from "react";

export default function OverlapDialog({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog open state

  const queryClient = useQueryClient();

  const { mutate: reviewMutation } = useMutation({
    mutationFn: (id: string) => registerEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", id] });
      toast("Đăng ký thành công!");
      setIsDialogOpen(false); // Close the dialog on success
    },
    onError: () => toast.error("Đăng kí thất bại!"),
  });

  const handleSubmit = async () => {
    reviewMutation(id);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button size="lg" className="text-md py-8 w-full">
          Đăng ký
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Có sự kiện trùng ngày</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn đang có một hoặc nhiều sự kiện khác diễn ra cùng ngày với sự
            kiện này. Bạn vẫn muốn đăng ký chứ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Đăng ký</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

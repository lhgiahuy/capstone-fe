"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function OverlapDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Dialog open state

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Có sự kiện trùng ngày</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn đang có một hoặc nhiều sự kiện khác diễn ra cùng ngày với sự
            kiện này. Bạn nên cân nhắc trước khi đăng ký tham gia sự kiện này?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          {/* <AlertDialogAction onClick={handleSubmit}>Đăng ký</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

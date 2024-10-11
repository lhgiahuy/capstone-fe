"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { Upload } from "lucide-react";

export default function DetailEvent() {
  return (
    <div className="flex justify-center">
      {/* Thẻ chứa  nội dung của Event */}
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle>Nội dung sự kiện</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* <div className="grid gap-2">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="70"
                  src="/images/auth-bg.jpg"
                  width="200"
                />
              </div> */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Tên</Label>
                <div className="border p-2 rounded-sm">Alibaba</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Người tổ chức</Label>
                <div className="border p-2 rounded-sm">Alibaba</div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 ">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approval">Được duyệt</SelectItem>
                        <SelectItem value="waiting">Đang chờ</SelectItem>
                        <SelectItem value="cancel">Hủy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Mô tả :</Label>
                <div className="border p-4 rounded-sm">
                  Đây là sự kiện cho sinh viên tham gia vào môn thể thao chạy bộ
                  lành mạnh , kết nối xã hội được với nhiều người thông qua sự
                  kiện này
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col ">
          <Label htmlFor="file">File nội dung chi tiết về sự kiện :</Label>
          <div>
            <File />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

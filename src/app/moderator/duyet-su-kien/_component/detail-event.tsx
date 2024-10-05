"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File } from "lucide-react";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
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
    <div className="flex">
      {/* Thẻ chứa  nội dung của Event */}
      <Card className="w-[60%] h-[440px] mr-6">
        <CardHeader>
          <CardTitle>Nội dung sự kiện</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Tên sự kiện</Label>
                <div className="border p-2 rounded-sm">
                  Sự kiện chạy bộ cùng sinh viên
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
          {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
          <Label htmlFor="file">File nội dung chi tiết về sự kiện :</Label>
          <div>
            <File />
          </div>
        </CardFooter>
      </Card>

      {/* Thẻ chứa ảnh và trạng thái của event */}
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8 w-[40%]">
        <Card x-chunk="dashboard-07-chunk-3">
          <CardHeader>
            <CardTitle>Trạng thái sự kiện</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
          <CardHeader>
            <CardTitle>Ảnh sử kiện</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="200"
                src="/images/auth-bg.jpg"
                width="300"
              />
              {/* <div className="grid grid-cols-3 gap-2">
                <button title="Submit img">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src="/images/auth-bg.jpg"
                    width="84"
                  />
                </button>
                <button title="Submit img">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src="/images/auth-bg.jpg"
                    width="84"
                  />
                </button>
                <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

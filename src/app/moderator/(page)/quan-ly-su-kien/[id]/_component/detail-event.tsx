"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  // CardHeader,
  // CardTitle,
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
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/action/event";
import Image from "next/image";
import { DetailEventProps, Event } from "@/interface/event";
// import { Button } from "@/components/ui/button";
import ButtonApproved from "@/app/moderator/(page)/_component/button-approved";
import { formatDate } from "@/lib/date";
// import "../../../style/description.css";

// import { Upload } from "lucide-react";

export default function DetailEvent({ eventId }: DetailEventProps) {
  const { data } = useQuery<Event>({
    queryKey: ["events"],
    queryFn: () => getEventById(eventId),
  });

  if (!data) return <></>;
  if (!data?.eventTags) return <></>;

  return (
    <div className="flex justify-center">
      {/* Thẻ chứa  nội dung của Event */}
      <Card className="w-[100%]">
        {/* <CardHeader>
          <CardTitle>Nội dung sự kiện</CardTitle>
        </CardHeader> */}
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4 mt-3">
              <div className="grid gap-2 justify-center">
                <Image
                  alt="Product image"
                  className="aspect-square  rounded-[26px] object-cover justify-center"
                  height="80"
                  src="/images/auth-bg.jpg"
                  width="250"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Tên</Label>
                <div className="border p-2 rounded-sm">{data.eventName}</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Thể loại</Label>
                <div className="border p-2 rounded-sm">
                  {data.eventTypeName}
                </div>
                <div className="flex-row mt-3 items-center justify-center">
                  <Label htmlFor="name">Gắn Thẻ</Label>
                  {Array.isArray(data?.eventTags) ? (
                    data.eventTags.map((tag: string, index: number) => (
                      <div
                        key={index}
                        className="text-white text-[14px] bg-[#797777d6] mx-1 px-2 rounded w-[200px]"
                      >
                        {tag}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Không có thẻ sự kiện</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Người tổ chức</Label>
                <div className="border p-2 rounded-sm">
                  {data?.organizerName}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Địa điểm</Label>
                <div className="border p-2 rounded-sm">{data.location}</div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Link meeting sự kiện</Label>
                <div className="border p-2 rounded-sm">
                  {data.linkEvent || "Chưa có link sự kiện"}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Mật khẩu meeting của sự kiện</Label>
                <div className="border p-2 rounded-sm">
                  {data.passwordMeeting || "Chưa có mật khẩu meeting"}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Ngày bắt đầu</Label>
                <div className="border p-2 rounded-sm">
                  {formatDate(data.startTime)}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Ngày kết thúc</Label>
                <div className="border p-2 rounded-sm">
                  {formatDate(data.endTime)}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Số lượng người tham gia</Label>
                <div className="border p-2 rounded-sm">{data.maxAttendees}</div>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 ">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder={data.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Phê duyệt</SelectItem>
                        <SelectItem value="false">Từ chối</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Mô tả :</Label>

                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="prose description"
                ></div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col ">
          <Label htmlFor="file">File nội dung chi tiết về sự kiện :</Label>
          <div>
            <File />
          </div>
          {/* <Button className="justify-center items-center mt-6">
            Phê duyệt xự kiện
          </Button> */}
          <ButtonApproved eventId={eventId} />
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContentNotification() {
  return (
    <div className="flex ">
      <Card>
        <CardHeader>
          <div className="flex justify-between py-2">
            <div className="flex">
              <Avatar className="w-8 h-8 ">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="imgAvatar"
                />
                <AvatarFallback className="text-black">Admin</AvatarFallback>
              </Avatar>
              <CardTitle className="ml-4 translate-y-2">Alice Smith</CardTitle>
            </div>
            <div>over 1 year</div>
          </div>
          <CardDescription>Meeting tomorrow</CardDescription>
          <div className="text-[12px]"> Reply-To: bobjohnson@example.com</div>
        </CardHeader>
        <CardContent className="grid w-full  gap-4 h-[280px]">
          <div className=" border-gray border-2 rounded-sm px-4 py-2">
            Hi, let s have a meeting tomorrow to discuss the project. It s
            crucial that we align on our next steps to ensure the project s
            success.
          </div>
        </CardContent>
        <div className="mt-4">
          <div className="flex justify-between mx-6 my-4 ">
            <Button className="w-[120px]">Đóng</Button>
            <Link href="/admin/hoi-dap">
              <Button className="bg-blue-600 w-[120px]">Hồi đáp</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

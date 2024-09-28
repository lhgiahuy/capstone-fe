"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContentNotification } from "./content-notification";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Data = [
  {
    id: 1,
    sender: "Alice Smith",
    avatar: "https://github.com/shadcn.png",
    fallback: "A",
    timeAgo: "over 1 year",
    subject: "Meeting tomorrow",
    tags: ["meeting", "work", "important"],
  },
  {
    id: 2,
    sender: "Bob Johnson",
    avatar: "https://github.com/shadcn.png",
    fallback: "B",
    timeAgo: "2 days ago",
    subject: "New Project Proposal",
    tags: ["proposal", "work"],
  },
  {
    id: 3,
    sender: "Charlie Brown",
    avatar: "https://github.com/shadcn.png",
    fallback: "C",
    timeAgo: "1 hour ago",
    subject: "Urgent: Review needed",
    tags: ["urgent", "review", "important"],
  },
  {
    id: 4,
    sender: "Charlie Brown",
    avatar: "https://github.com/shadcn.png",
    fallback: "C",
    timeAgo: "1 hour ago",
    subject: "Urgent: Review needed",
    tags: ["urgent", "review", "important"],
  },
];

export function ListNotification() {
  const [showFullContent, setShowFullContent] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setShowFullContent(id);
  };

  return (
    <div className="flex">
      <div className="w-[40%] h-[540px] overflow-y-auto pr-2">
        {Data.map((notification) => (
          <Card
            key={notification.id}
            className="mb-4 cursor-pointer h-[160px]"
            onClick={() => handleClick(notification.id)}
          >
            <CardHeader>
              <div className="flex justify-between">
                <div className="flex">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={notification.avatar} alt="imgAvatar" />
                    <AvatarFallback className="text-black">
                      {notification.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="ml-4 translate-y-2">
                    {notification.sender}
                  </CardTitle>
                </div>
                <div>{notification.timeAgo}</div>
              </div>
              <CardDescription>{notification.subject}</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2">
              {notification.tags.map((tag, index) => (
                <Button key={index} variant="outline">
                  {tag}
                </Button>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>

      {showFullContent && (
        <div className="ml-4 w-[60%] h-[540px]  p-2 rounded-md">
          <ContentNotification />
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
// import logo from "../img/logo.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOutUser } from "@/lib/auth";
import { getMe, getUserNotification, readNotification } from "@/action/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFirstLetterOfName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactShowMoreText from "react-show-more-text";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";
import { Notification } from "@/interface/notification";
interface Breadcrumb {
  link: string;
  title: string;
}

interface BreadcrumbsProps {
  breadcrumb: Breadcrumb[];
}
export default function NavBar({ breadcrumb }: BreadcrumbsProps) {
  const { data: user } = useQuery({
    queryKey: ["Me"],
    queryFn: getMe,
  });
  const { data: notification } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: getUserNotification,
  });
  const [popoverOpen, setPopoverOpen] = useState(false);

  const query = useQueryClient();
  const { mutate: readNotificationMutation } = useMutation({
    mutationFn: (notiId: string) => readNotification(notiId),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["notification"] });
      query.invalidateQueries({ queryKey: ["Me"] });
    },
  });
  const handleReadNotification = (notiId: string) => {
    readNotificationMutation(notiId);
  };
  const router = useRouter();
  return (
    <div className="py-6 flex justify-between items-center">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center">
              <BreadcrumbItem className="hover:text-accent-foreground">
                <BreadcrumbLink asChild>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4">
        <Button
          size={"lg"}
          onClick={() => router.push("/organizer/quan-ly-su-kien/tao-su-kien")}
        >
          Thêm sự kiện
        </Button>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild className="hover:cursor-pointer">
            {user?.isHaveUnreadNoti ? (
              <div className="relative rounded-full w-10 h-10 bg-foreground flex items-center justify-center">
                <Bell className="w-5 h-5 text-background" />
                <div className="absolute top-[-1px] right-0 bg-red-600 rounded-full h-3 w-3"></div>
              </div>
            ) : (
              <div className="rounded-full w-10 h-10 bg-foreground flex items-center justify-center">
                <Bell className="w-5 h-5 text-background" />
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent
            className="min-w-[32rem] flex flex-col gap-4"
            align="end"
            sideOffset={8}
          >
            <h2 className="text-primary font-bold text-2xl">Thông báo</h2>
            {notification?.length ? (
              <ScrollArea className="h-[24rem] max-w-[32rem]">
                <div className="w-full flex flex-col">
                  {notification.map((item) => (
                    <Button
                      // href={`/su-kien/${item.eventId}`}
                      variant={"ghost"}
                      onClick={() => {
                        setPopoverOpen(false);
                        handleReadNotification(item.notiId);
                        if (item.eventId)
                          router.push(
                            `/organizer/quan-ly-su-kien/${item.eventId}`
                          );
                      }}
                      key={item.notiId}
                      className="flex relative gap-4 py-2 text-left w-full justify-between items-start h-full hover:bg-card px-4 rounded-lg py-2"
                    >
                      <div className="flex flex-col w-fit justify-start gap-2 text-wrap">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-primary text-sm">{item.title}</h3>
                          <span
                            onClick={(e) => e.stopPropagation()} // Prevent the popover from closing
                          >
                            <ReactShowMoreText
                              lines={1}
                              more="Xem thêm"
                              less="Ẩn bớt"
                              className="text-sm"
                              anchorClass="text-primary hover:cursor-pointer"
                              width={600}
                              truncatedEndingComponent={"  ... "}
                            >
                              <p className="text-sm">{item.message}</p>
                            </ReactShowMoreText>
                          </span>
                        </div>
                        <p
                          className={`${
                            item.readStatus === "Unread"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }   text-sm`}
                        >
                          {formatDistanceToNow(item.sendTime, {
                            locale: vi,
                          })}
                        </p>
                      </div>
                      {item.readStatus === "Unread" && (
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                      )}
                      {/* <div className="absolute flex w-full items-end justify-end">
                                  <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    onClick={() => {
                                      setPopoverOpen(false);
                                      handleReadNotification(item.notiId);
                                      if (item?.eventId)
                                        router.push(`/su-kien/${item.eventId}`);
                                    }}
                                    className=" hover:bg-slate-400 px-2 py-2 rounded-full"
                                  >
                                    <Ellipsis></Ellipsis>
                                  </Button>
                                </div> */}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="min-h-[24rem] flex flex-col gap-2 items-center w-full justify-center item-center">
                <BellOff className="text-primary h-8 w-8"></BellOff>
                <p className="text-primary">Chưa có thông báo</p>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatarUrl} alt="imgAvatar" />
              <AvatarFallback>
                {getFirstLetterOfName(user?.username)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10}>
            <DropdownMenuLabel className="max-w-[12rem]">
              {user?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/thong-tin-ca-nhan">Hồ sơ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await signOutUser({ redirect: false });
                window.location.href = "/";
              }}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

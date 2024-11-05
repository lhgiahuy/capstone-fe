"use client";

import { Bell, Calendar, Music, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atom/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import EventCard from "@/app/(user)/_component/event-card";
import { useQuery } from "@tanstack/react-query";
import { getEvent, getTag } from "@/action/event";
import { Event } from "@/interface/event";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "@/interface/tag";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function UserNavBar() {
  const [user] = useAtom(userAtom);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchString = searchParams.get("tu-khoa")?.toString() || "";
  const LIMIT = 4;
  const { data: event } = useQuery({
    queryKey: ["events", searchString, LIMIT],
    queryFn: () =>
      getEvent({
        SearchKeyword: searchString,
        PageSize: LIMIT,
      }),
  });
  const { data: tag } = useQuery({
    queryKey: ["tags"],
    queryFn: getTag,
  });
  const handleSearch = useDebouncedCallback((searchString: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchString) {
      params.set("tu-khoa", searchString);
    } else {
      params.delete("tu-khoa");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="font-bold text-2xl">
          FVENT
        </Link>
        <div className="relative">
          <Button
            variant="ghost"
            className="absolute right-[0.5rem] p-0"
            onClick={() => {
              push(`/su-kien?tu-khoa=${searchString}`);
            }}
          >
            <Search className="text-background h-5 w-5" />
          </Button>
          {pathname == "/su-kien" ? (
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full rounded-lg bg-foreground border-0 md:w-[24rem] lg:w-[32rem]"
              onFocus={() => setOpen(true)} // Open popover on input focus
              onBlur={(e) => {
                // Optional: Close the popover if the focus shifts outside
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpen(false);
                }
              }}
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("tu-khoa")?.toString()}
            />
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full rounded-lg bg-foreground border-0 md:w-[24rem] lg:w-[32rem]"
                  onFocus={() => setOpen(true)} // Open popover on input focus
                  onBlur={(e) => {
                    // Optional: Close the popover if the focus shifts outside
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setOpen(false);
                    }
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                  defaultValue={searchParams.get("tu-khoa")?.toString()}
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={10}
                className="flex flex-col gap-4 w-full justify-center"
              >
                <div className="flex flex-col gap-4">
                  <h3>Sự kiện bạn đang tìm...</h3>
                  {searchString ? (
                    <></>
                  ) : (
                    <div className="flex gap-8">
                      {tag?.slice(0, 3).map((item: Tag, index: number) => (
                        <Link
                          href="#"
                          key={item.tagId}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={cn(
                              "rounded-full w-28 h-28  flex items-center justify-center",
                              `${
                                index % 2 == 0
                                  ? "bg-primary text-accent"
                                  : "bg-secondary text-secondary-background"
                              }`
                            )}
                          >
                            <Music className="h-16 w-16"></Music>
                          </div>
                          <Badge className="bg-foreground rounded-full mt-[-1rem] px-4 uppercase">
                            {item.tagName}
                          </Badge>
                        </Link>
                      ))}
                      <div className="flex flex-col items-center">
                        <div className="rounded-full w-28 h-28 bg-foreground text-background  flex items-center justify-center">
                          <Music className="h-16 w-16"></Music>
                        </div>
                        <Badge className="bg-foreground border-background border-2 rounded-full mt-[-1rem] px-4 uppercase">
                          {`+${tag?.length - 3} more`}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                {searchString ? <></> : <h3>Gợi ý dành riêng cho bạn</h3>}
                <div className="flex max-w-[44rem] gap-4 flex-wrap">
                  {event?.items.map((item: Event) => (
                    <EventCard
                      key={item.eventId}
                      data={item}
                      className="basis-[calc(50%-0.5rem)] min-w-[18rem]"
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex gap-4">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#">
                  <Calendar />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-foreground">
                <p>Xem lịch</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
          {user ? (
            <div className="flex items-center gap-4 hover:cursor-pointer">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="rounded-full w-10 h-10 bg-foreground flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-background"></Calendar>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground">
                    <p>Xem lịch</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="rounded-full w-10 h-10 bg-foreground flex items-center justify-center">
                      <Bell className="w-5 h-5 text-background" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-foreground">
                    <p>Xem thông báo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-4 items-center py-1.5 px-4 bg-foreground rounded-full">
                    <div className="text-sm">
                      Hi, {user?.firstName + " " + user?.lastName}
                    </div>
                    <Avatar className="w-8 h-8 hover:cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-w-s">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-2 items-center text-sm">
              <Link href="/dang-nhap">Đăng nhập</Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href="#">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
      {pathname == "/su-kien" ? (
        <></>
      ) : (
        <div className="bg-secondary-background">
          <div className="flex gap-4 container py-4 text-foreground">
            {tag?.map((item: Tag) => (
              <Link
                href="#"
                key={item.tagId}
                className="px-4 py-1 text-sm border-2 border-foreground/10 hover:border-foreground rounded-full capitalize"
              >
                {item.tagName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

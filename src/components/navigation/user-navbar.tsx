"use client";

import { Bell, BellOff, Calendar, Search, Trash } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
import { useEffect, useState } from "react";
// import EventCard from "@/app/(user)/_component/event-card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvent, getTag } from "@/action/event";
// import { Event } from "@/interface/event";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tag } from "@/interface/tag";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { signOutUser } from "@/lib/auth";
import { getMe, getUserNotification, readNotification } from "@/action/user";
import useDebounce from "@/hooks/use-debounce";
import useSearchParamsHandler from "@/hooks/use-add-search-param";
import EventList from "@/app/(user)/_component/event-list";
import { Notification } from "@/interface/notification";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { ScrollArea } from "../ui/scroll-area";
import ShowMoreText from "react-show-more-text";
import { clearNotification, deleteNotification } from "@/action/notification";
import { toast } from "sonner";

export default function UserNavBar() {
  const { data: user } = useQuery({
    queryKey: ["Me"],
    queryFn: getMe,
  });
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchString = searchParams.get("tu-khoa")?.toString() || "";
  const [searchValue, setSearchValue] = useState(searchString);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const router = useRouter();
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
  const [addParam, clearParam] = useSearchParamsHandler();
  // const handleSearch = useDebouncedCallback((searchString: string) => {
  //   addParam({ "tu-khoa": searchString });
  // }, 300);
  useEffect(() => {
    if (debouncedSearchValue) {
      // Add or update the search parameter if there is a value
      addParam({ "tu-khoa": debouncedSearchValue });
    } else {
      // Clear the search parameter if the value is empty
      clearParam("tu-khoa");
    }
  }, [debouncedSearchValue, addParam, clearParam]);
  const handleTagInput = (value: string) => {
    addParam({ "tu-khoa": value });
    setSearchValue(value);
  };
  const { data: notification } = useQuery<Notification[]>({
    queryKey: ["notification"],
    queryFn: getUserNotification,
  });
  const query = useQueryClient();
  const { mutate: readNotificationMutation } = useMutation({
    mutationFn: (notiId: string) => readNotification(notiId),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["notification"] });
      query.invalidateQueries({ queryKey: ["Me"] });
    },
  });
  const { mutate: clearNotificationMutation } = useMutation({
    mutationFn: clearNotification,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["notification"] });
      query.invalidateQueries({ queryKey: ["Me"] });
      toast("Đã xoá tất cả thông báo");
    },
    onError: () => toast("Có lỗi gì đã xảy ra!"),
  });
  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["notification"] });
      query.invalidateQueries({ queryKey: ["Me"] });
      toast("Đã xoá thông báo");
    },
    onError: () => toast("Có lỗi gì đã xảy ra!"),
  });
  const handleReadNotification = (notiId: string) => {
    readNotificationMutation(notiId, {
      onError: () => toast("Có lỗi gì đã xảy ra!"),
    });
  };
  const handleClearNotification = () => {
    clearNotificationMutation();
  };
  const handleDeleteNotification = (id: string) => {
    deleteNotificationMutation(id);
  };
  return (
    <nav className="bg-primary sticky top-0 w-full z-30 text-primary-foreground">
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
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpen(false);
                }
              }}
              onChange={(e) => handleSearch(e)}
              value={searchValue}
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
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setOpen(false);
                    }
                  }}
                  onChange={(e) => handleSearch(e)}
                  value={searchValue}
                />
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={10}
                className="flex flex-col gap-4 w-full justify-center min-w-[48rem]"
              >
                <ScrollArea className="h-[32rem]">
                  <div className="flex flex-col gap-4">
                    {/* {!searchString && <h3>Gợi ý tag</h3>} */}

                    {searchString ? (
                      <></>
                    ) : (
                      <div className="flex gap-8 mt-4">
                        {tag
                          ?.sort(() => Math.random() - 0.5) // Randomize order
                          .slice(0, 5)
                          .map((item: Tag, index: number) => (
                            <div
                              key={item.tagId}
                              className="flex flex-col items-center"
                            >
                              <Button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleTagInput(item.tagName)}
                                variant={"link"}
                                className={cn(
                                  "rounded-full w-28 h-28 flex items-center justify-center",
                                  `${
                                    index % 2 === 0
                                      ? "bg-primary text-accent"
                                      : "bg-secondary text-secondary-background"
                                  }`
                                )}
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.svgContent,
                                  }}
                                  className="*:w-12 *:h-12"
                                ></div>
                              </Button>
                              <Badge className="bg-foreground rounded-full mt-[-1rem] py-1 uppercase w-[8rem] flex items-center justify-center text-center">
                                {item.tagName}
                              </Badge>
                            </div>
                          ))}
                        {/* <div className="flex flex-col items-center">
                        <div className="rounded-full w-28 h-28 bg-foreground text-background  flex items-center justify-center">
                          <p className="font-bold text-4xl">{`+${
                            tag?.length - 3
                          }`}</p>
                        </div>
                        <Badge className="bg-foreground border-background border-2 rounded-full mt-[-1rem] px-4 uppercase">
                          {`tag`}
                        </Badge>
                      </div> */}
                      </div>
                    )}
                  </div>
                  {searchString ? (
                    <h3>Kết quả tìm kiếm</h3>
                  ) : (
                    <h3 className="mt-4 text-lg">Gợi ý tìm kiếm</h3>
                  )}
                  {/* <div className="flex max-w-[48rem] gap-4 flex-wrap">
                  {event?.items.map((item: Event) => (
                    <EventCard
                      key={item.eventId}
                      data={item}
                      className="basis-[calc(50%-0.5rem)] min-w-[18rem]"
                    />
                  ))}
                </div> */}
                  <EventList
                    data={event}
                    className="flex max-w-[48rem] gap-4 flex-wrap"
                    cardClassName="basis-[calc(50%-0.5rem)]"
                  />
                </ScrollArea>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex gap-4">
          {user ? (
            <div className="flex items-center gap-4 hover:cursor-pointer">
              {user.roleName === "organizer" ? (
                <></>
              ) : (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/su-kien-cua-toi"
                          className="rounded-full w-10 h-10 bg-foreground flex items-center justify-center"
                        >
                          <Calendar className="w-5 h-5 text-background"></Calendar>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-foreground">
                        <p>Xem lịch</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  {user.isHaveUnreadNoti ? (
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
                <PopoverContent className="min-w-[32rem] flex flex-col gap-4">
                  <div className="w-full flex justify-between">
                    <h2 className="text-primary font-bold text-2xl">
                      Thông báo
                    </h2>
                    <Button onClick={handleClearNotification}>
                      Xoá tất cả thông báo
                    </Button>
                  </div>
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
                              if (item?.eventId) {
                                user.roleName === "student"
                                  ? router.push(`/su-kien/${item.eventId}`)
                                  : router.push(
                                      `/organizer/quan-ly-su-kien/${item.eventId}`
                                    );
                              }
                            }}
                            key={item.notiId}
                            className="flex group relative gap-4 py-2 text-left w-full justify-between items-start h-full hover:bg-card px-4 rounded-lg py-2"
                          >
                            <div className="flex flex-col w-fit justify-start gap-2 text-wrap">
                              <div className="flex flex-col gap-2">
                                <h3 className="text-primary text-sm">
                                  {item.title}
                                </h3>
                                <div className="flex">
                                  <span
                                    onClick={(e) => e.stopPropagation()} // Prevent the popover from closing
                                  >
                                    <ShowMoreText
                                      lines={1}
                                      more="Xem thêm"
                                      less="Ẩn bớt"
                                      className="text-sm"
                                      anchorClass="text-primary hover:cursor-pointer"
                                      width={550}
                                      truncatedEndingComponent={"  ... "}
                                    >
                                      <p className="text-sm">{item.message}</p>
                                    </ShowMoreText>
                                  </span>
                                  <Button
                                    variant={"ghost"}
                                    className="px-3 shrink-1 text-muted-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteNotification(item.notiId);
                                    }}
                                  >
                                    <Trash className="w-5 h-5"></Trash>
                                  </Button>
                                </div>
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
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-4 items-center">
                    <div className="text-sm">Xin chào, {user?.username}</div>
                    <Avatar className="w-8 h-8 hover:cursor-pointer">
                      <AvatarImage
                        src={user?.avatarUrl || "https://github.com/shadcn.png"}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="max-w-s">
                  <DropdownMenuGroup>
                    {user?.roleName === "organizer" && (
                      <DropdownMenuItem>
                        <Link href="/organizer/quan-ly-su-kien">
                          Quản lý sự kiện
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem>
                      <Link href="/thong-tin-ca-nhan">Thông tin cá nhân</Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem> */}
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOutUser({ redirect: false });
                        window.location.href = "/";
                      }}
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex gap-4 items-center text-sm">
              <Button
                variant={"secondary"}
                onClick={() => {
                  router.push("/organizer/dang-ky");
                }}
              >
                Tạo sự kiện ngay
              </Button>
              <div className="flex gap-2 items-center text-sm">
                <Link href="/dang-nhap">Đăng nhập</Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/dang-ky">Đăng ký</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* {pathname == "/su-kien" ? (
        <></>
      ) : (
        <div className="bg-secondary-background">
          <div className="flex gap-4 container py-4 text-foreground">
            {tag?.slice(0, 7).map((item: Tag) => (
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
      )} */}
      {!(user?.verifyStatus === "Verified") && user && (
        <div className="py-4 bg-secondary-background">
          <div className="container text-secondary">
            Tài khoản của bạn chưa được xác thực.{" "}
            <span>
              <Link href="/thong-tin-ca-nhan" className="text-primary">
                Xác thực ngay{" "}
              </Link>
            </span>
            để có thể tham gia những sự kiện hấp dẫn.
          </div>
        </div>
      )}
      {user?.isBanned && user && (
        <div className="py-4 bg-destructive">
          <div className="container text-accent">
            Tài khoản của bạn đã bị tạm khóa do vượt quá số lần tham gia sự kiện
            quy định.
          </div>
        </div>
      )}
    </nav>
  );
}

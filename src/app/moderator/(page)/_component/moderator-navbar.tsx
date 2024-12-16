"use client";

import Link from "next/link";
// import logo from "../img/logo.png";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../../components/ui/avatar";
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
import { signOutUser } from "@/lib/auth";
import { getMe } from "@/action/user";
import { useQuery } from "@tanstack/react-query";
import { getFirstLetterOfName } from "@/lib/utils";

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
      {/* <div className="relative ml-auto pr-4 flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div> */}
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
              window.location.href = "/admin/dang-nhap";
            }}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

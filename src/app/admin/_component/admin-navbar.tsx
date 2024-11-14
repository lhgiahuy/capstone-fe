"use client";

import Link from "next/link";
// import logo from "../img/logo.png";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { signOutUser } from "@/lib/auth";
interface BreadcrumbsProps {
  links: string[];
}
export default function AdminNavBar({ links }: BreadcrumbsProps) {
  return (
    <div className="dark:bg-slate-700 py-6 flex justify-between items-center">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {links.map((item, index) => (
            <span key={index} className="flex items-center">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">{item}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < links.length - 1 && <BreadcrumbSeparator />}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto pr-4 flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="imgAvatar" />
            <AvatarFallback className="text-black">Admin</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={10}>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Hồ sơ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/event">Sự kiện</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOutUser({ redirectTo: "/admin/dang-nhap" })}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

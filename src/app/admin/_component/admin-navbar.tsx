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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { signOutUser } from "@/lib/auth";
import { AddModerator } from "./add-moderator";
import CreateEventType from "../(page)/quan-ly-the-loai-su-kien/_component/create-event-type";
import { usePathname } from "next/navigation";
import CreateTag from "../(page)/quan-ly-the-su-kien/_component/create-tag";
interface Breadcrumb {
  link: string;
  title: string;
}

interface BreadcrumbsProps {
  breadcrumb: Breadcrumb[];
}
export default function AdminNavBar({ breadcrumb }: BreadcrumbsProps) {
  const pathname = usePathname();
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

      <div className="flex gap-4 items-center">
        {pathname === "/admin/quan-ly-the-loai-su-kien" && <CreateEventType />}
        {pathname === "/admin/quan-ly-nguoi-dung" && <AddModerator />}
        {pathname === "/admin/quan-ly-the-su-kien" && <CreateTag />}

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="imgAvatar"
              />
              <AvatarFallback className="text-black">Admin</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10}>
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOutUser({ redirect: false });
                window.location.href = "/dang-nhap";
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

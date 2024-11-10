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
interface Breadcrumb {
  link: string;
  title: string;
}

interface BreadcrumbsProps {
  breadcrumb: Breadcrumb[];
}
export default function NavBar({ breadcrumb }: BreadcrumbsProps) {
  return (
    <div className="bg-background py-6 flex justify-between items-center">
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
          <DropdownMenuItem>
            <Link href="/auth">Đăng xuất</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

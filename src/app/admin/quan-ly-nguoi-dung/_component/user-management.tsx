import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getFirstLetterOfName, getRole } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const users = [
  {
    userName: "Nguyễn Văn A",
    email: "nguyena@example.com",
    role: 1,
    status: 1,
  },
  {
    userName: "Trần Thị B",
    email: "tranb@example.com",
    role: 2,
    status: 0,
  },
  {
    userName: "Phạm Văn C",
    email: "phamc@example.com",
    role: 3,
    status: 1,
  },
  {
    userName: "Lê Thị D",
    email: "led@example.com",
    role: 2,
    status: 1,
  },
  {
    userName: "Hoàng Văn E",
    email: "hoange@example.com",
    role: 1,
    status: 0,
  },
];

export default function UserManagement() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Vai trò" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Admin</SelectItem>
            <SelectItem value="approved">Người dùng</SelectItem>
            <SelectItem value="pending">Moderator</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Table className="bg-white rounded-sm  mt-2">
        <TableCaption>Danh sách người dùng.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Tên người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src="" alt="user avatar" />
                  <AvatarFallback>
                    {getFirstLetterOfName(item.userName)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.userName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    item.role == 1
                      ? "bg-red-400 hover:bg-red-400"
                      : item.role == 2
                      ? "bg-orange-400 hover:bg-orange-400"
                      : "bg-blue-400 hover:bg-blue-400",
                    "cursor-default"
                  )}
                >
                  {getRole(item.role)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    item.status
                      ? "bg-green-400 hover:bg-green-400"
                      : "bg-slate-400 hover:bg-slate-400",
                    "cursor-default"
                  )}
                >
                  {item.status ? "Đang hoạt động" : "Không hoạt động"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import {
  Command,
  // CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  LogOut,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Command className="bg-secondary rounded-none text-white bg-gray-950">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Đề xuất">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="./">Bảng số liệu</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="./event">Sự kiện</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h-4 w-4" />
            <Link href="./post">Bài đăng</Link>
          </CommandItem>
          <CommandItem>
            <Users className="mr-2 h-4 w-4" />
            <Link href="./users">Người dùng</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Cài đặt">
          <CommandItem>
            <User className="nr-2 h-4 w-4" />
            <span>Hồ sơ</span>
            <CommandShortcut>TS</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LogOut className="nr-2 h-4 w-4" />
            <span>Đăng xuất</span>
            <CommandShortcut>%S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

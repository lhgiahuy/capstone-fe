import { Calendar, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const categories = ["Âm nhạc", "Thể thao", "Talkshow"];
export default function UserNavBar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container flex justify-between items-center py-4">
        <div className="font-bold text-2xl">FVENT</div>
        <div className="relative">
          <Search className="absolute right-2.5 top-1.5 h-6 w-6 text-background" />
          <Input
            type="search"
            placeholder="Tìm kiếm..."
            className="w-full rounded-lg bg-foreground border-0 md:w-[24rem] lg:w-[32rem]"
          />
        </div>
        <div className="flex gap-4">
          <TooltipProvider>
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
          </TooltipProvider>
          <div className="flex gap-2 items-center">
            <Link href="#">Đăng nhập</Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="#">Đăng ký</Link>
          </div>
        </div>
      </div>
      <div className="bg-secondary-background">
        <div className="flex gap-4 container py-4 text-foreground">
          {categories.map((item, index) => (
            <Link href="#" key={index} className="text-sm">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

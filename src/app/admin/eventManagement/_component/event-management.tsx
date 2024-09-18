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
import { Pencil, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const events = [
  {
    invoice: "Ảnh 1",
    paymentStatus: "Được duyệt",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Ảnh 2",
    paymentStatus: "Hủy",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Ảnh 3",
    paymentStatus: "Đang chờ",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Ảnh 4",
    paymentStatus: "Được duyệt",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "Ảnh 5",
    paymentStatus: "Được duyệt",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "Ảnh 6",
    paymentStatus: "Đang chờ",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "Ảnh 7",
    paymentStatus: "Hủy",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function EventManagement() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sự kiện</SelectLabel>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="approved">Được duyệt</SelectItem>
            <SelectItem value="pending">Đang chờ</SelectItem>
            <SelectItem value="Cancelled">Hủy</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Table>
        <TableCaption>Danh sách sự kiện.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ảnh</TableHead>
            <TableHead>Tên sự kiện</TableHead>
            <TableHead>Địa điểm</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Ngày diễn ra</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.invoice}>
              <TableCell className="font-medium">{event.invoice}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentMethod}</TableCell>
              <TableCell>{event.paymentStatus}</TableCell>
              {/* <TableCell className="text-right">{event.totalAmount}</TableCell> */}
              <TableCell>
                <div className="flex space-x-2">
                  {/* Edit Button */}
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {/* Delete Button */}
                  <Button variant="destructive" size="sm">
                    <CircleX className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

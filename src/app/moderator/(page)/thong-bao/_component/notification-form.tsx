"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { stringSchema } from "@/validation/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { sendNotification } from "@/action/notification";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  role: stringSchema,
  title: stringSchema,
  message: stringSchema,
});

export function Notification() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      title: "",
      message: "",
      role: "",
    },
  });
  const { mutate: sendNotificationMutation } = useMutation({
    mutationFn: (data: any) => sendNotification(data),
  });
  const [loading, setLoading] = React.useState(false);

  // sài để thông báo khi sumbit
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    sendNotificationMutation(data, {
      onSuccess: () => {
        setLoading(false);
        toast("Gửi thông báo thành công"),
          form.reset({ role: "", title: "", message: "" });
      },
      onError: () => {
        toast("Gửi thông báo thất bại"), setLoading(false);
      },
    });
  }

  return (
    <Form {...form}>
      {/* <form  className="w-2/3 space-y-6"> */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 p-6 rounded-md border-2 border-muted"
      >
        <h1 className="text-center text-4xl font-semibold text-primary">
          Gửi thông báo
        </h1>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Người nhận</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)} // Updates form state
                  value={field.value} // Controlled by form state
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đối tượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Sinh viên</SelectItem>
                    <SelectItem value="organizer">Ban tổ chức</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội dung</FormLabel>
              <FormControl className="h-60">
                <Textarea placeholder="Nhập nội dung" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Link href="/admin/thong-bao">
            <Button variant={"outline"}>Quay lại</Button>
          </Link>
          <Button type="submit" size={"lg"} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Gửi thông báo
          </Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  role: z.string().min(2, {
    message: "Role must be selected.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});

export function Notification() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // sài để thông báo khi sumbit
  //   function onSubmit(data: z.infer<typeof FormSchema>) {
  //     toast({
  //       title: "You submitted the following values:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //         </pre>
  //       ),
  //     });
  //   }

  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6"> */}
      <form className="w-2/3 space-y-6 bg-white p-6 rounded-md ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormDescription>Nhập email ở đây</FormDescription>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({}) => (
            <FormItem>
              <FormLabel>Vai trò</FormLabel>
              <FormDescription>Chọn vai trò</FormDescription>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Vai trò</SelectLabel>
                      <SelectItem value="organizer">Người tổ chức</SelectItem>
                      <SelectItem value="user">Người dùng</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormDescription>Nhập tiêu đề ở đây</FormDescription>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormDescription>Nhập nội dung thông báo</FormDescription>
              <FormControl className="h-60">
                <Textarea placeholder="Nhập nội dung" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Gửi thông báo</Button>
      </form>
    </Form>
  );
}

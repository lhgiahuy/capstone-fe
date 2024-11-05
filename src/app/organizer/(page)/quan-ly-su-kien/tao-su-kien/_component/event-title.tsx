"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "../_lib/validation";
import TinyEditor from "@/components/editor/tiny-editor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function EventTitle() {
  const [isOpen, setIsOpen] = useState(false);
  const types = ["Loại 1", "Loại 2", "Loại 3"];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      date: new Date(),
      startTime: "05:00",
      endTime: "08:00",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const markup = { __html: values.content };
      toast(
        <pre className="mt-2 w-[340px] rounded-md p-4">
          <p>{JSON.stringify(values, null, 2)}</p>
          <div dangerouslySetInnerHTML={markup}></div>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-8"
        >
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-5xl">Tổng Quan Sự kiện</div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sự kiện</FormLabel>
                  <FormDescription>
                    Hãy rõ ràng và mô tả chi tiết với tiêu đề để mọi người hiểu
                    sự kiện của bạn là gì.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Tên sự kiện" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại sự kiện</FormLabel>
                  <FormDescription>Lựa chọn loại sự kiện</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Loại sự kiện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-5xl">Mô tả</div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nội dung</FormLabel>
                  <FormDescription>Nội dung của sự kiện</FormDescription>
                  <FormControl>
                    <TinyEditor
                      value={field.value}
                      onEditorChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-5xl">Thời gian và địa điểm</div>
            <Label className="text-xl font-semibold">Loại sự kiện</Label>
            <Tabs defaultValue="one-day">
              <TabsList className="px-0 pb-4 pt-8 gap-4">
                <TabsTrigger
                  value="one-day"
                  className="p-4 border-2 data-[state=active]:border-primary"
                >
                  Sự kiện diễn ra trong 1 ngày
                </TabsTrigger>
                <TabsTrigger
                  value="multiple-day"
                  className="p-4 border-2 data-[state=active]:border-primary "
                >
                  Sự kiện diễn ra trong nhiều ngày
                </TabsTrigger>
              </TabsList>
              <div className="mb-4 mt-8 text-xl font-semibold">Ngày và giờ</div>
              <TabsContent value="one-day">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel>Ngày</FormLabel>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[320px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "Pp")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel>Thời gian bắt đầu</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="font-normal focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-[15rem]">
                                {Array.from({ length: 96 }).map((_, i) => {
                                  const hour = Math.floor(i / 4)
                                    .toString()
                                    .padStart(2, "0");
                                  const minute = ((i % 4) * 15)
                                    .toString()
                                    .padStart(2, "0");
                                  return (
                                    <SelectItem
                                      key={i}
                                      value={`${hour}:${minute}`}
                                    >
                                      {hour}:{minute}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel>Thời gian kết thúc</FormLabel>

                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="font-normal focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-[15rem]">
                                {Array.from({ length: 96 }).map((_, i) => {
                                  const hour = Math.floor(i / 4)
                                    .toString()
                                    .padStart(2, "0");
                                  const minute = ((i % 4) * 15)
                                    .toString()
                                    .padStart(2, "0");
                                  return (
                                    <SelectItem
                                      key={i}
                                      value={`${hour}:${minute}`}
                                    >
                                      {hour}:{minute}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="multiple-day">
                <div className="flex gap-4 flex-wrap">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                        <FormLabel>Ngày bắt đầu</FormLabel>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-auto pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "P")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                        <FormLabel>Thời gian bắt đầu</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="font-normal focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-[15rem]">
                                {Array.from({ length: 96 }).map((_, i) => {
                                  const hour = Math.floor(i / 4)
                                    .toString()
                                    .padStart(2, "0");
                                  const minute = ((i % 4) * 15)
                                    .toString()
                                    .padStart(2, "0");
                                  return (
                                    <SelectItem
                                      key={i}
                                      value={`${hour}:${minute}`}
                                    >
                                      {hour}:{minute}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                        <FormLabel>Ngày kết thúc</FormLabel>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-auto pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "P")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                        <FormLabel>Thời gian kết thúc</FormLabel>

                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="font-normal focus:ring-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-[15rem]">
                                {Array.from({ length: 96 }).map((_, i) => {
                                  const hour = Math.floor(i / 4)
                                    .toString()
                                    .padStart(2, "0");
                                  const minute = ((i % 4) * 15)
                                    .toString()
                                    .padStart(2, "0");
                                  return (
                                    <SelectItem
                                      key={i}
                                      value={`${hour}:${minute}`}
                                    >
                                      {hour}:{minute}
                                    </SelectItem>
                                  );
                                })}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <Label className="text-xl font-semibold">Loại sự kiện</Label>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Địa điểm</FormLabel>
                  <FormControl>
                    <Input placeholder="Địa điểm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Lưu sự kiện</Button>
        </form>
      </Form>
    </>
  );
}

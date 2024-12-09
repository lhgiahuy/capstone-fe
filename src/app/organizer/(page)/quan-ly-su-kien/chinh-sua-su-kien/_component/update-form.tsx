"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TinyEditor from "@/components/editor/tiny-editor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Download,
  LayoutList,
  Loader2,
  MinusCircle,
  Trash,
  Upload,
} from "lucide-react";
import { format, formatISO, toDate } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageInput from "@/components/ui/image-input";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEventType, getTag, updateEvent } from "@/action/event";
import { EventType } from "@/interface/event-type";
import { TagInput } from "@/components/my-ui/tag-input";
import { formSchema } from "../_lib/validation";
import { Event } from "@/interface/event";
import { formatTo12HourTime } from "@/lib/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { uploadImageToStorage } from "@/lib/firebase/upload-file";

export default function UpdateForm({ data }: { data: Event }) {
  const { data: tags } = useQuery({
    queryKey: ["event-tags"],
    queryFn: getTag,
  });
  const { data: types } = useQuery({
    queryKey: ["event-types"],
    queryFn: getEventType,
  });
  const [isLoading, setIsLoading] = useState(false);
  const formType = ["Plain Text", "Choice"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
    values: {
      event: {
        ...(data as any),
        dateType: "one-day",
        date: toDate(data.startTime),
        startDate: toDate(data.startTime),
        endDate: toDate(data.endTime),
        startTime: formatTo12HourTime(data.startTime),
        endTime: formatTo12HourTime(data.endTime),
        eventLink: data.linkEvent,
        locationType: data.location !== "" ? "offline" : "online",
        maxAttendees: data.maxAttendees.toString(),
      },
    },
  });
  const { mutate: updateEventMutate } = useMutation({
    mutationFn: ({ data, eventId }: { data: any; eventId: string }) =>
      updateEvent(data, eventId),
  });
  const [imagePopover, setImagePopover] = useState(false);
  const [editProposal, setEditProposal] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const startDate =
      values.event.dateType === "one-day"
        ? `${formatISO(values.event.date).split("T")[0]}T${
            values.event.startTime
          }`
        : `${formatISO(values.event.startDate).split("T")[0]}T${
            values.event.startTime
          }`;
    const endDate =
      values.event.dateType === "one-day"
        ? `${formatISO(values.event.date).split("T")[0]}T${
            values.event.endTime
          }`
        : `${formatISO(values.event.endDate).split("T")[0]}T${
            values.event.endTime
          }`;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error("Thời gian không hợp lệ");
      setIsLoading(false);
    } else if (end <= start) {
      toast.error("Thời gian không hợp lệ");
      setIsLoading(false);
    } else {
      const thumbnailUrl = await uploadImageToStorage({
        saveLocation: `events/${values.event.eventName}-thumbnail`,
        file: values.event.thumbnailImg,
      });
      const posterUrl = await uploadImageToStorage({
        saveLocation: `events/${values.event.eventName}-poster`,
        file: values.event.posterImg,
      });
      const proposalUrl = await uploadImageToStorage({
        saveLocation: `events/${values.event.eventName}-proposal`,
        file: values.event.proposal,
      });
      updateEventMutate(
        {
          data: {
            eventName: values.event.eventName,
            description: values.event.description,
            startTime: startDate,
            endTime: endDate,
            eventTypeId: values.event.eventTypeId,
            location: values.event.location,
            linkEvent:
              values.event.locationType === "online"
                ? values.event.eventLink
                : "",
            passwordMeeting:
              values.event.locationType === "online"
                ? values.event.passwordMeeting
                : "",
            posterImg: posterUrl,
            thumbnailImg: thumbnailUrl,
            eventTags: values.event.eventTags,
            maxAttendees: parseInt(values.event.maxAttendees || "0"),
            createFormDetailsReq: values.createFormDetailsReq,
            proposal: proposalUrl,
          },
          eventId: data.eventId,
        },
        {
          onSuccess: () => {
            toast("Chỉnh sửa sự kiện thành công"),
              setIsLoading(false),
              router.push("/organizer/quan-ly-su-kien?status=Draft");
          },
          onError: () => {
            setIsLoading(false);
            toast.error("Chỉnh sửa sự kiện thất bại");
          },
        }
      );
    }
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "createFormDetailsReq",
  });

  const addForm = () => {
    append({ name: "", type: "", options: [] });
  };
  if (!tags) return <></>;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-8"
        >
          <div className="relative w-full min-h-[24rem] overflow-hidden border-muted-background hover:border-primary border-2 rounded-lg p-8 flex items-center justify-center">
            {!imagePopover ? (
              <div className="absolute flex justify-center items-center w-full h-full">
                <div className="relative w-full h-full opacity-60">
                  <Image
                    src="/images/event-bg-4.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute">
                  <Button
                    type="button"
                    className="flex-col bg-foreground text-background hover:bg-foreground flex h-fit py-8  w-[10rem] gap-4"
                    onClick={() => setImagePopover(true)}
                  >
                    <div className="p-3 bg-primary rounded-full text-background">
                      <Upload className="h-4 w-4" />
                    </div>
                    <p className="text-wrap">Tải ảnh lên</p>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-16">
                <div className="font-bold text-2xl">Ảnh đại diện</div>
                <div className="flex flex-col gap-8 w-full">
                  {/* Poster của sự kiện */}
                  <FormField
                    control={form.control}
                    name="event.posterImg"
                    render={({ field }) => (
                      <>
                        <FormLabel>Poster của sự kiện</FormLabel>
                        <FormItem className="w-full">
                          <FormControl>
                            <ImageInput
                              subtitle="Nên sử dụng hình khổ dọc"
                              placeholderImage={field.value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />

                  {/* Ảnh nền của sự kiện */}
                  <FormField
                    control={form.control}
                    name="event.thumbnailImg"
                    render={({ field }) => (
                      <>
                        <FormLabel>Ảnh nền của sự kiện</FormLabel>
                        <FormItem>
                          <FormControl>
                            <ImageInput
                              subtitle="Nên sử dụng hình khổ ngang"
                              placeholderImage={field.value}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Tổng quan sự kiện</div>
            <FormField
              control={form.control}
              name="event.eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sự kiện</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên sự kiện" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event.eventTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại sự kiện</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Loại sự kiện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types?.map((item: EventType) => (
                        <SelectItem
                          key={item.eventTypeId}
                          value={item.eventTypeId}
                        >
                          {item.eventTypeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event.maxAttendees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số lượng người tham gia (Có thể bỏ trống)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Số lượng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event.eventTags"
              render={({ field }) => (
                <>
                  {field.value && (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <TagInput
                          defaultValue={field.value}
                          options={tags}
                          onValueChange={field.onChange}
                          placeholder="Nhập tag"
                          animation={2}
                          maxCount={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                </>
              )}
            />
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Mô tả</div>
            <FormField
              control={form.control}
              name="event.description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  {/* <FormLabel>Nội dung</FormLabel> */}
                  {/* <FormDescription>Nội dung của sự kiện</FormDescription> */}
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
            <div className="font-bold text-4xl">Thời gian và địa điểm</div>
            {/* <Label className="text-xl font-semibold">Loại sự kiện</Label> */}
            <FormField
              control={form.control}
              name="event.dateType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Tabs
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-8 items-start w-full"
                    >
                      <TabsList className="bg-background gap-4">
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
                      {/* <div className="mb-4 mt-8 text-xl font-semibold">Ngày và giờ</div> */}
                      <TabsContent value="one-day" className="w-full">
                        <div className="flex gap-4 items-center w-full">
                          <FormField
                            control={form.control}
                            name="event.date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormLabel>Ngày</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[320px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd/MM/yyyy")
                                        ) : (
                                          <span>Chọn ngày</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date <
                                        new Date(
                                          new Date().setDate(
                                            new Date().getDate() + 6
                                          )
                                        )
                                      }
                                      initialFocus
                                      today={field.value}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="event.startTime"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormLabel>Thời gian bắt đầu</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="font-normal focus:ring-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <ScrollArea className="h-[15rem]">
                                        {Array.from({ length: 96 }).map(
                                          (_, i) => {
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
                                          }
                                        )}
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
                            name="event.endTime"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full">
                                <FormLabel>Thời gian kết thúc</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="font-normal focus:ring-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <ScrollArea className="h-[15rem]">
                                        {Array.from({ length: 96 }).map(
                                          (_, i) => {
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
                                          }
                                        )}
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
                      <TabsContent value="multiple-day" className="w-full">
                        <div className="flex gap-4 flex-wrap">
                          <FormField
                            control={form.control}
                            name="event.startDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                                <FormLabel>Ngày bắt đầu</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-auto pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd/MM/yyyy")
                                        ) : (
                                          <span>Chọn ngày</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date <
                                        new Date(
                                          new Date().setDate(
                                            new Date().getDate() + 6
                                          )
                                        )
                                      }
                                      initialFocus
                                      today={field.value}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="event.startTime"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                                <FormLabel>Thời gian bắt đầu</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="font-normal focus:ring-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <ScrollArea className="h-[15rem]">
                                        {Array.from({ length: 96 }).map(
                                          (_, i) => {
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
                                          }
                                        )}
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
                            name="event.endDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                                <FormLabel>Ngày kết thúc</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-auto pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "dd/MM/yyyy")
                                        ) : (
                                          <span>Chọn ngày</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date <
                                        new Date(
                                          new Date().setDate(
                                            new Date().getDate() + 7
                                          )
                                        )
                                      }
                                      initialFocus
                                      today={field.value}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="event.endTime"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-[calc(50%-1rem)]">
                                <FormLabel>Thời gian kết thúc</FormLabel>

                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="font-normal focus:ring-0">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <ScrollArea className="h-[15rem]">
                                        {Array.from({ length: 96 }).map(
                                          (_, i) => {
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
                                          }
                                        )}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event.locationType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Tabs
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-4 items-start w-full"
                    >
                      <TabsList className="gap-4">
                        <TabsTrigger value="offline">
                          Sự kiện offline
                        </TabsTrigger>
                        <TabsTrigger value="online">Sự kiện online</TabsTrigger>
                      </TabsList>
                      <TabsContent value="offline" className="w-full">
                        <FormField
                          control={form.control}
                          name="event.location"
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full">
                              <FormLabel>Địa điểm tổ chức</FormLabel>
                              <FormControl>
                                <Input placeholder="Nhập địa điểm" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      <TabsContent
                        value="online"
                        className="w-full flex flex-col gap-8"
                      >
                        <FormField
                          control={form.control}
                          name="event.eventLink"
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full">
                              <FormLabel>Link tham gia sự kiện</FormLabel>
                              <FormControl>
                                <Input placeholder="Nhập link" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <FormField
                          control={form.control}
                          name="event.passwordMeeting"
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-2 w-full">
                              <FormLabel>
                                Mật khẩu của meeting (Nếu có)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Nhập mật khẩu" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}
                      </TabsContent>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Form đăng ký sự kiện</div>
            <div className="flex flex-col w-full gap-8">
              {fields.map((item, index) => (
                <div className="flex items-center gap-8" key={item.id}>
                  <div className="flex flex-col w-full gap-4">
                    <h3>{`Câu hỏi ${index + 1}`}</h3>
                    <FormField
                      control={form.control}
                      name={`createFormDetailsReq.${index}.type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex-col flex gap-4">
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-1/3">
                                  <SelectValue placeholder="Chọn loại form" />
                                </SelectTrigger>
                                <SelectContent>
                                  {formType?.map((item, index) => (
                                    <SelectItem key={index} value={item}>
                                      {item}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {field.value === "Plain Text" ? (
                                <FormField
                                  control={form.control}
                                  name={`createFormDetailsReq.${index}.name`}
                                  render={({ field }) => (
                                    <FormControl>
                                      <FormItem>
                                        <Input
                                          placeholder="Câu hỏi"
                                          {...field}
                                        ></Input>
                                      </FormItem>
                                    </FormControl>
                                  )}
                                ></FormField>
                              ) : field.value === "Choice" ? (
                                <div className="flex flex-col gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`createFormDetailsReq.${index}.name`}
                                    render={({ field }) => (
                                      <FormControl>
                                        <FormItem>
                                          <Input
                                            placeholder="Câu hỏi"
                                            {...field}
                                          ></Input>
                                        </FormItem>
                                      </FormControl>
                                    )}
                                  />
                                  <AnswersFieldArray
                                    form={form}
                                    control={form.control}
                                    parentIndex={index}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                  >
                    <Trash className="text-destructive h-5 w-5" />
                  </Button>
                </div>
              ))}
              {fields.length > 0 ? (
                <Button type="button" className="py-8" onClick={addForm}>
                  Thêm câu hỏi
                </Button>
              ) : (
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-secondary-background text-secondary rounded-lg">
                      <LayoutList />
                    </div>
                    <h3>Tạo form dành cho sự kiện có đăng ký tham gia</h3>
                  </div>
                  <Button type="button" onClick={addForm}>
                    Thêm
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Proposal của sự kiện</div>

            {editProposal ? (
              <>
                <FormField
                  control={form.control}
                  name="event.proposal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đính kèm file proposal của sự kiện</FormLabel>
                      <FormControl>
                        <Input
                          className="hover:cursor-pointer"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-col gap-8">
                <Link
                  href={data.proposal}
                  className="text-primary hover:text-primary/80 flex gap-2"
                >
                  <Download></Download>
                  Tải xuống proposal
                </Link>
                <Button className="py-4" onClick={() => setEditProposal(true)}>
                  Chỉnh sửa proposal
                </Button>
              </div>
            )}
          </div>
          <div className="flex w-full justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="px-16"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

function AnswersFieldArray({
  form,
  control,
  parentIndex,
}: {
  form: any;
  control: any;
  parentIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `createFormDetailsReq.${parentIndex}.options`,
  });
  const addOption = () => {
    const lastAnswer =
      form.getValues(
        `createFormDetailsReq.${parentIndex}.options.${fields.length - 1}`
      ) || "";
    if (lastAnswer.trim() === "" && fields.length > 0) {
      // Set error on the answers field
      toast("Vui lòng điền câu trả lời");
      return;
    }
    append("");
  };
  return (
    <div className="flex flex-col gap-8">
      {fields.map((item, answerIndex) => (
        <div key={item.id} className="flex flex-col gap-2 w-full">
          <h5 className="text-sm">{`Câu trả lời ${answerIndex + 1}`}</h5>
          <div className="flex gap-4 w-full">
            <FormField
              name={`createFormDetailsReq.${parentIndex}.options.${answerIndex}`}
              control={control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nhập câu trả lời"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(answerIndex)}
            >
              <MinusCircle className="text-destructive" />
            </Button>
          </div>
        </div>
      ))}
      <div>
        <Button type="button" variant="secondary" onClick={addOption}>
          Thêm câu trả lời
        </Button>
      </div>
    </div>
  );
}

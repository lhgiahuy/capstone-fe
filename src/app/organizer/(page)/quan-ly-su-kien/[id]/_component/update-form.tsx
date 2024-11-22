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
import { formSchema } from "../_lib/validation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Clock,
  LayoutList,
  Loader2,
  MapPinned,
  MinusCircle,
  Trash,
  Upload,
} from "lucide-react";
import { format, formatISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageInput from "@/components/ui/image-input";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEventById, getEventType, submitEvent } from "@/action/event";
import { EventType } from "@/interface/event-type";
// import { uploadImageToStorage } from "@/lib/firebase/upload-file";
import { formatDate } from "@/lib/date";
import { useRouter } from "next/navigation";

export default function UpdateForm({ id }: { id: string }) {
  const { data: types } = useQuery({
    queryKey: ["event-types"],
    queryFn: getEventType,
  });
  const { mutate: submitMutation } = useMutation({
    mutationFn: (id: string) => submitEvent(id),
  });
  const [update] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formType = ["Plain Text", "Choice"];
  // const { mutate: createEventMutate } = useMutation({
  //   mutationFn: (data: any) => createEvent(data),
  // });
  const { data: eventDetail } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { event: eventDetail },
  });
  const [imagePopover, setImagePopover] = useState(false);
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
      // const url = await uploadImageToStorage({
      //   saveLocation: `events/${values.event.eventName}`,
      //   file: values.event.imageUrl,
      // });
      // createEventMutate(
      //   {
      //     eventName: values.event.eventName,
      //     description: values.event.description,
      //     startTime: startDate,
      //     endTime: endDate,
      //     eventTypeId: values.event.eventTypeId,
      //     location: values.event.location,
      //     linkEvent:
      //       values.event.locationType === "online"
      //         ? values.event.eventLink
      //         : "",
      //     passwordMeeting:
      //       values.event.locationType === "online"
      //         ? values.event.passwordMeeting
      //         : "",
      //     posterImg: "string",
      //     thumbnailImg: url,
      //     eventTags: ["Test"],
      //     createFormDetailsReq: values.createFormDetailsReq,
      //     proposal: "string",
      //   },
      //   {
      //     onSuccess: () => {
      //       toast("Tạo event thành công"), setIsLoading(false);
      //     },
      //     onError: () => {
      //       setIsLoading(false);
      //       toast.error("Tạo event thất bại");
      //     },
      //   }
      // );
    }
  }
  const router = useRouter();
  const handleSubmitEvent = (eventId: string) => {
    submitMutation(eventId, {
      onSuccess: () =>
        router.push("/organizer/quan-ly-su-kien?status=UnderReview"),
    });
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "createFormDetailsReq",
  });

  const addForm = () => {
    append({ name: "", type: "", options: [] });
  };

  if (!eventDetail) return <></>;
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-8"
        >
          <div className="relative w-full min-h-[24rem] overflow-hidden border-muted-background hover:border-primary border-2 rounded-lg p-8 flex items-center justify-center">
            {update ? (
              <FormField
                control={form.control}
                name="event.imageUrl"
                render={({ field }) => (
                  <>
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
                          <FormLabel>Poster của sự kiện</FormLabel>
                          <FormItem className="w-full">
                            <FormControl>
                              <ImageInput
                                subtitle="Nên sử dụng hình khổ dọc"
                                placeholderImage="/images/image-placeholder-portrait.jpg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          {/* <FormLabel>Ảnh nền của sự kiện</FormLabel>
                        <FormItem>
                          <FormControl>
                            <ImageInput
                              subtitle="Nên sử dụng hình khổ ngang"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem> */}
                        </div>
                      </div>
                    )}
                  </>
                )}
              />
            ) : (
              <div className="flex gap-16 items-center">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-primary text-2xl font-bold">Thumbnail</h2>
                  <Image
                    src={eventDetail.thumbnailImg}
                    alt=""
                    width={200}
                    height={300}
                  ></Image>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-primary text-2xl font-bold">Poster</h2>
                  {eventDetail.posterImg.startsWith("https") ? (
                    <Image
                      src={eventDetail.posterImg}
                      alt=""
                      width={200}
                      height={300}
                    ></Image>
                  ) : (
                    <Image
                      src={"/images/image-placeholder-portrait.jpg"}
                      alt=""
                      width={200}
                      height={300}
                    ></Image>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Tổng quan sự kiện</div>
            {update ? (
              <>
                <FormField
                  control={form.control}
                  name="event.eventName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sự kiện</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="Tên sự kiện" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="event.eventTypeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại sự kiện</FormLabel>
                      <Select
                        disabled
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Loại sự kiện" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {types?.map((item: EventType) => (
                            <SelectItem
                              key={item.eventTypeId}
                              value={item.eventTypeName}
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
              </>
            ) : (
              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">Tên sự kiện</p>
                  <h1 className="uppercase text-2xl">
                    {eventDetail.eventName}
                  </h1>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">Loại sự kiện</p>
                  <h2 className=" text-lg">{eventDetail.eventTypeName}</h2>
                </div>
              </div>
            )}
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
                    <div
                      dangerouslySetInnerHTML={{ __html: field.value }}
                      className="[&_span]:inline-block [&_img]:inline-block [&_a]:text-primary [&_a]:underline [&_a]:transition[&_a]:duration-300 [&_a:hover]:text-primary/60"
                    ></div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="border-2 flex flex-col gap-8 rounded-lg border-muted-background p-8 hover:border-primary">
            <div className="font-bold text-4xl">Thời gian và địa điểm</div>
            {/* <Label className="text-xl font-semibold">Loại sự kiện</Label> */}
            {update ? (
              <>
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
                                              format(field.value, "P")
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
                                              new Date().setHours(0, 0, 0, 0)
                                            )
                                          }
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
                                name="event.startTime"
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
                                        defaultValue={field.value}
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
                                              format(field.value, "P")
                                            ) : (
                                              <span>Pick a date</span>
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
                                name="event.startTime"
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
                                              format(field.value, "P")
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
                                name="event.endTime"
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
                            <TabsTrigger value="online">
                              Sự kiện online
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="offline" className="w-full">
                            <FormField
                              control={form.control}
                              name="event.location"
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 w-full">
                                  <FormLabel>Địa điểm tổ chức</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Nhập địa điểm"
                                      {...field}
                                    />
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
                            <FormField
                              control={form.control}
                              name="event.passwordMeeting"
                              render={({ field }) => (
                                <FormItem className="flex flex-col gap-2 w-full">
                                  <FormLabel>
                                    Mật khẩu của meeting (Nếu có)
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Nhập mật khẩu"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TabsContent>
                        </Tabs>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                  <Clock className="text-primary" />
                  <p>
                    {formatDate(eventDetail?.startTime, "p, d MMMM, y")} -{" "}
                    {formatDate(eventDetail?.endTime, "p, d MMMM, y")}
                  </p>
                </div>
                <div className="flex gap-4">
                  <MapPinned className="text-primary" />
                  {eventDetail?.location ? (
                    <p>{eventDetail?.location}</p>
                  ) : (
                    <p>{eventDetail?.linkEvent}</p>
                  )}
                </div>
              </div>
            )}
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
          <div className="flex gap-4 w-full justify-center">
            {eventDetail.status === "Draft" ? (
              <>
                <Button
                  type="button"
                  disabled={isLoading}
                  size="lg"
                  className="px-16"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <></>
                  )}
                  Chỉnh sửa
                </Button>
                <Button
                  type="button"
                  disabled={isLoading}
                  size="lg"
                  className="px-16"
                  variant="secondary"
                  onClick={() => handleSubmitEvent(eventDetail.eventId)}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <></>
                  )}
                  Publish sự kiện
                </Button>
              </>
            ) : (
              <Button
                type="button"
                disabled={isLoading}
                size="lg"
                className="px-16"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <></>
                )}
                Tạo mã QR
              </Button>
            )}
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
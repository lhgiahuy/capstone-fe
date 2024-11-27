"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema, TypeOfRegistrationForm } from "../_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Event } from "@/interface/event";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/action/user";
import { registerEvent, submitForm, unRegisterEvent } from "@/action/event";
import ReviewForm from "./review-form";
import OverlapDialog from "./overlap-dialog";

export default function FormSheet({ data }: { data: Event }) {
  const [open, setOpen] = useState(false); // State to manage Sheet visibility
  const { data: user } = useQuery({ queryKey: ["Me"], queryFn: getMe });
  const form = useForm<TypeOfRegistrationForm>({
    resolver: zodResolver(formSchema),
    values: {
      data: data?.form.map((item) => ({ question: item.name, answer: "" })),
    },
  });
  const queryClient = useQueryClient();

  const { mutate: submitFormMutation } = useMutation({
    mutationFn: (formData) => submitForm(formData, data.eventId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["event", data.eventId] }),
  });

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: (id: string) => registerEvent(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["event", data.eventId] }),
  });
  const { mutate: unRegisterMutation, isPending: isLoading } = useMutation({
    mutationFn: (id: string) => unRegisterEvent(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["event", data.eventId] }),
  });
  const handleRegistration = () => {
    registerMutation(data.eventId, {
      onSuccess: () => toast("Đăng ký thành công!"),
      onError: () => toast("Đăng ký thất bại!"),
    });
  };
  const handleUnregistration = () => {
    unRegisterMutation(data.eventId, {
      onSuccess: () => toast("Huỷ đăng ký thành công!"),
      onError: () => toast("Huỷ đăng ký thất bại!"),
    });
  };
  const onSubmit: SubmitHandler<any> = async (data) => {
    submitFormMutation(data, {
      onSuccess: () => {
        toast("Đăng ký thành công");
      },
      onError: () => toast.error("Đăng ký thất bại!"),
    });
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {user?.verifyStatus === "Verified" &&
      data.status !== "Completed" &&
      !data.isRegistered &&
      data.form.length > 0 ? (
        <SheetTrigger asChild>
          <Button size="lg" className="text-md py-8 w-full">
            Đăng ký
          </Button>
        </SheetTrigger>
      ) : data.status !== "Completed" && !data.isRegistered ? (
        <Button
          size="lg"
          className="text-lg w-full py-8"
          disabled={isPending || !(user?.verifyStatus === "Verified")}
          onClick={handleRegistration}
        >
          Đăng ký
        </Button>
      ) : data.isRegistered &&
        !data.isReviewed &&
        data.status === "Completed" ? (
        <ReviewForm id={data.eventId}></ReviewForm>
      ) : data.isRegistered && data.status !== "Completed" ? (
        <Button
          size="lg"
          variant={"destructive"}
          className="text-lg w-full py-8"
          disabled={isLoading}
          onClick={handleUnregistration}
        >
          Huỷ đăng ký
        </Button>
      ) : data.isOverlap ? (
        <OverlapDialog id={data.eventId} />
      ) : (
        <Button
          size="lg"
          className="text-lg py-8 w-full text-foreground hover:bg-orange-600 bg-orange-600"
        >
          Đã kết thúc
        </Button>
      )}

      {/* <SheetTrigger asChild>
        <Button size="lg" className="text-md py-8">
          Đăng ký
        </Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Form đăng ký sự kiện</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-8 py-16 px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                {data.form.map((item, index) => (
                  <div className="flex flex-col gap-4" key={index}>
                    {/* <h2 className="text-xl">{`Câu hỏi ${index + 1}: `}</h2> */}
                    <FormField
                      control={form.control}
                      name={`data.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <h3 className="text-lg">{field.value}</h3>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {item.type.toLowerCase() === "plain text" ? (
                      <FormField
                        control={form.control}
                        name={`data.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Câu trả lời*" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name={`data.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                {item.options.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={item}
                                      id={`r${index}`}
                                    />
                                    <Label
                                      htmlFor={`r${index}`}
                                      className="text-md"
                                    >
                                      {item}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                ))}
                <Button type="submit" className="w-full">
                  Gửi
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

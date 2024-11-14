"use client";

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

export default function FormSheet({ data }: { data: Event }) {
  const form = useForm<TypeOfRegistrationForm>({
    resolver: zodResolver(formSchema),
    values: {
      data: data?.form.map((item) => ({ question: item.name, answer: "" })),
    },
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    toast(JSON.stringify(data.data, null, 2));
  };
  return (
    <Sheet>
      {/* {user?.verifyStatus === "Vertified" && (
      <SheetTrigger asChild>
        <Button size="lg" className="text-md py-8">
          Đăng ký
        </Button>
      </SheetTrigger>
    )}
    <Button
      size="lg"
      className="text-md py-8"
      onClick={() => toast("Vui lòng xác thực tài khoản để đăng ký")}
    >
      Đăng ký
    </Button> */}
      <SheetTrigger asChild>
        <Button size="lg" className="text-md py-8">
          Đăng ký
        </Button>
      </SheetTrigger>
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
                    <h2 className="text-xl">{`Câu hỏi ${index + 1}: `}</h2>
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
                                    <RadioGroupItem value={item} id="r1" />
                                    <Label htmlFor="r1" className="text-md">
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

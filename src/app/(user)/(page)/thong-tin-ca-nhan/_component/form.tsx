"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, TypeOfProfileForm } from "../_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Ellipsis, Loader2, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileForm({ values }: any) {
  const router = useRouter();
  const [isLoading] = useState(false);
  const form = useForm<TypeOfProfileForm>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
    values,
  });
  const onSubmit: SubmitHandler<TypeOfProfileForm> = async (data) => {
    toast(JSON.stringify(data));
  };
  // if (!values) return <></>;
  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-4xl text-primary">Thông tin cá nhân</h1>
      <div className="flex w-full gap-32">
        <div className="flex flex-col items-center gap-8">
          <div className="relative h-[14rem] rounded-full overflow-hidden w-[14rem] shrink-0">
            <Image
              src={values?.avatarUrl || ""}
              alt="user avatar"
              fill
              className="object-cover"
            />
          </div>
          {values?.verifyStatus == "Unverified" ? (
            <div className="flex gap-2 text-destructive items-center">
              <X />
              <p className="text-sm">Tài khoản chưa xác thực</p>
            </div>
          ) : values?.verifyStatus == "UnderVerify" ? (
            <div className="flex gap-2 text-orange-400 items-center">
              <Ellipsis />
              <p className="text-sm">Tài khoản đang xác thực</p>
            </div>
          ) : (
            <div className="flex gap-2 text-primary items-center">
              <Check />
              <p className="text-sm">Tài khoản đã xác thực</p>
            </div>
          )}
        </div>
        {/* <Separator orientation="vertical" className="h-full"></Separator> */}
        <div className="flex w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email*" disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {values?.verifyStatus !== "Unverified" && (
                <FormField
                  control={form.control}
                  name="cardUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thẻ FPT</FormLabel>
                      <FormControl>
                        <div className="relative h-[16rem] overflow-hidden w-full shrink-0">
                          {field.value.startsWith("https//firebasestorage") ? (
                            <Image
                              src={field.value}
                              alt="user avatar"
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <Image
                              src={"/images/image-placeholder.jpg"}
                              alt="user avatar"
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="w-full flex justify-center gap-8 pt-8">
                {values?.verifyStatus === "Unverified" && (
                  <Button
                    type="button"
                    size={"lg"}
                    disabled={isLoading}
                    variant="secondary"
                    className="w-2/3"
                    onClick={() => router.push("/xac-thuc-tai-khoan")}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <></>
                    )}
                    Xác thực tài khoản
                  </Button>
                )}
                <Button
                  type="submit"
                  size={"lg"}
                  disabled={isLoading}
                  className="w-full "
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <></>
                  )}
                  Cập nhật thông tin
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

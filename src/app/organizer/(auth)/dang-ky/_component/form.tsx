"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signUpOrganizer } from "@/action/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { formSchema, TypeOfOrganizerSignUpForm } from "../_lib/validation";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<TypeOfOrganizerSignUpForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      studentId: "",
    },
  });
  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: (data: TypeOfOrganizerSignUpForm) => signUpOrganizer(data),
  });
  const onSubmit: SubmitHandler<TypeOfOrganizerSignUpForm> = async (data) => {
    signUpMutate(data, {
      onSuccess: () => {
        router.push("/dang-ky-thanh-cong");
      },
      onError: (error) => {
        toast(error.message);
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
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
              <FormControl>
                <Input placeholder="Email*" {...field} />
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
              <FormControl>
                <Input placeholder="Số điện thoại*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Mật khẩu*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Nhập lại mật khẩu*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4 space-y-4">
          {/* <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox required />
              <div className="text-sm text-gray-500">
                I agree with{" "}
                <span className="text-foreground font-bold">
                  Privacy Policy
                </span>{" "}
                and <span className="text-foreground font-bold">Terms</span> of
                Use
              </div>
            </div>
          </div> */}
          <Button
            type="submit"
            size={"lg"}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Đăng ký
          </Button>
        </div>
      </form>
    </Form>
  );
}

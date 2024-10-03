"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formSchema, TypeOfLoginForm } from "../_lib/validation";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TypeOfLoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const onSubmit: SubmitHandler<TypeOfLoginForm> = async () => {
    toast({
      title: "Đăng nhập",
      description: "...",
    });
    setIsLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên đăng nhập hoặc email*" {...field} />
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox />
            <div className="text-sm text-gray-500">Ghi nhớ đăng nhập</div>
          </div>
          <Link href="/" className="font-semibold">
            Quên mật khẩu?
          </Link>
        </div>
        <Button
          type="submit"
          size={"lg"}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <></>
          )}
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}

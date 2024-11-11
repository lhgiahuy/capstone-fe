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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { formSchema, TypeOfLoginForm } from "../_lib/validation";
import { useToast } from "@/hooks/use-toast";
import { PasswordInput } from "@/components/ui/password-input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TypeOfLoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit: SubmitHandler<TypeOfLoginForm> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!res?.ok) {
        console.log(res);
        setIsLoading(false);
        throw new Error(res?.error || "Lỗi đăng nhập");
      }
      router.push("/admin");
      setIsLoading(false);
      toast({ title: "Đăng nhập", description: "..." });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Đăng nhập",
        description: "Tài khoản không tồn tại!",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
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
          {/* <Link href="/" className="font-semibold">
            Quên mật khẩu?
          </Link> */}
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

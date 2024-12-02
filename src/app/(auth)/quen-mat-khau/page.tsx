"use client";

import { forgotPassword } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { mutate: forgotPasswordMutation } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      toast(
        "Gửi yêu cầu thành công. Vui lòng kiểm tra email của bạn để đặt lại mật khẩu"
      );
    },
    onError: () => {
      toast("Có lỗi gì đó đã xảy ra!");
    },
  });
  const onSubmit = async () => {
    forgotPasswordMutation(email);
  };
  return (
    <div className="px-32 h-full justify-center w-full flex flex-col gap-8">
      <h1 className="font-bold text-primary text-5xl">Quên mật khẩu</h1>
      <div className="flex flex-col gap-8">
        <h3>Vui lòng nhập email tài khoản của bạn để đặt lại mật khẩu</h3>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Quay lại
          </Button>
          <Button onClick={onSubmit}>Gửi yêu cầu</Button>
        </div>
      </div>
    </div>
  );
}

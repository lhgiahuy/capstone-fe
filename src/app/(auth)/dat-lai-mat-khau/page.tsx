"use client";

import { resetPassword } from "@/action/user";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId")?.toString() || "";
  const token = searchParams.get("token")?.toString() || "";
  const router = useRouter();
  const { mutate: resetPasswordMutation } = useMutation({
    mutationFn: ({
      userId,
      token,
      password,
    }: {
      userId: string;
      token: string;
      password: string;
    }) => resetPassword({ userId, token, password }),
    onSuccess: () => {
      toast("Mật khẩu của bạn đã được thay đổi thành công");
      router.push("/dang-nhap");
    },
    onError: () => {
      toast("Có lỗi gì đó đã xảy ra!");
    },
  });
  const onSubmit = async () => {
    if (confimPassword !== password) toast("Mật khẩu không trùng khớp!");
    else resetPasswordMutation({ password, token, userId });
  };
  return (
    <div className="flex flex-col gap-8 w-full px-32">
      <h1 className="font-bold text-primary text-5xl">Đổi mật khẩu</h1>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4">
          <h3>Mật khẩu mới</h3>
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3>Nhập lại mật khẩu mới</h3>
          <PasswordInput
            placeholder="Confirm password"
            value={confimPassword}
            onChange={(e) => setConfimPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Quay lại
          </Button>
          <Button onClick={onSubmit}>Đổi mật khẩu</Button>
        </div>
      </div>
    </div>
  );
}

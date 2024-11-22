"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[4rem] font-extrabold leading-1 text-transparent">
          Đăng ký tài khoản thành công
        </span>
        <h2 className="my-4 text-2xl font-bold">
          Vui lòng check mail để xác thực email.
        </h2>
        <span>
          *Nếu bạn không nhận được email xác nhận, vui lòng kiểm tra hộp thư rác
          hoặc spam.
        </span>
        <div className="mt-8 flex justify-center gap-2">
          <Button
            onClick={() => router.push("/dang-nhap")}
            variant="default"
            size="lg"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </>
  );
}

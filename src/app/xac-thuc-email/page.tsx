"use client";

import { verifyEmail } from "@/action/user";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorPage from "../error";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const token = searchParams.get("token") || "";
  // const { mutate: verifyEmailMutation } = useMutation({
  //   mutationFn: ({ userId, token }: { userId: string; token: string }) =>
  //     verifyEmail(userId, token),
  // });
  const { data, isPending, error } = useQuery({
    queryKey: ["verify-emai"],
    queryFn: () => verifyEmail(userId, token),
  });
  if (isPending) return <></>;
  if (!data)
    return (
      <ErrorPage
        error={error as any}
        reset={() => location.reload()}
      ></ErrorPage>
    );
  return (
    <>
      <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[4rem] font-extrabold leading-1 text-transparent">
          Welcome to FVENT
        </span>
        <h2 className="my-4 text-2xl font-bold">
          Chúc mừng email của bạn đã xác thực thành công.
        </h2>
        <div className="mt-8 flex justify-center gap-2">
          <Button
            onClick={() => router.push("/dang-nhap")}
            variant="default"
            size="lg"
          >
            Đăng nhập ngay
          </Button>
        </div>
      </div>
    </>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { getServerAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./_component/form";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "This is the user login page for accessing the application. Users can enter their credentials to authenticate and gain access to their accounts.",
};

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-8 w-full px-32">
      <h1 className="text-5xl font-semibold">Đăng nhập</h1>
      <div className="flex gap-2">
        <p>Chưa có tài khoản?</p>
        <Link href="/dang-ky" className="text-primary hover:text-primary/80">
          Đăng ký
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}

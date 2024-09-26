import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./_component/form";
export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "This is the user login page for accessing the application. Users can enter their credentials to authenticate and gain access to their accounts.",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-8 w-full px-32">
      <h1 className="text-5xl font-semibold">Đăng nhập</h1>
      <div className="flex gap-2">
        <p>Chưa có tài khoản?</p>
        <Link href="/dang-ky" className="text-orange-500 hover:text-orange-600">
          Đăng ký
        </Link>
      </div>
      <LoginForm />
    </div>
  );
}

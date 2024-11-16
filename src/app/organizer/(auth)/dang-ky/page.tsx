import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./_component/form";

export const metadata: Metadata = {
  title: "Đăng ký",
  description:
    "This is the user sign up page for creating a new account on the application. Users can fill in their details to register and gain access to exclusive features.",
};
export default function Page() {
  return (
    <div className="flex flex-col gap-8 w-full px-48 max-w-[64rem]">
      <h1 className="text-4xl font-semibold">Đăng ký tài khoản organizer</h1>
      <div className="flex gap-1 text-sm">
        <p>Đã có tài khoản?</p>
        <Link href="/dang-nhap" className="text-primary hover:text-primary/80">
          Đăng nhập ngay
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
}

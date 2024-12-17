import UserFooter from "@/components/navigation/user-footer";
import UserNavBar from "@/components/navigation/user-navbar";
import banner from "/public/images/banner.png";
import Image from "next/image";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <UserNavBar />
      <Image src={banner} alt="background" className="mb-12" priority></Image>

      <div className="container min-h-screen mb-12">{children}</div>
      <UserFooter />
    </div>
  );
}

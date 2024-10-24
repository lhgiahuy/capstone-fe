import UserFooter from "@/components/navigation/user-footer";
import UserNavBar from "@/components/navigation/user-navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-16">
      <UserNavBar />
      <div className="container">{children}</div>
      <UserFooter />
    </div>
  );
}

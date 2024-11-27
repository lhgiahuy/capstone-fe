import UserFooter from "@/components/navigation/user-footer";
import UserNavBar from "@/components/navigation/user-navbar";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-12">
      <UserNavBar />
      <div className="container mt-32 min-h-screen">{children}</div>
      <UserFooter />
    </div>
  );
}

import UserFooter from "@/components/navigation/user-footer";
import UserNavBar from "@/components/navigation/user-navbar";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-16">
      <UserNavBar />
      <div className="container min-h-screen">{children}</div>
      <UserFooter />
    </div>
  );
}

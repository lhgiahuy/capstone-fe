import UserFooter from "@/components/navigation/user-footer";
import UserNavBar from "@/components/navigation/user-navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-16">
      <UserNavBar user={session?.user} />
      <div className="container min-h-screen">{children}</div>
      <UserFooter />
    </div>
  );
}

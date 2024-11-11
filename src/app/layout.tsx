import type { Metadata } from "next";
import "./globals.css";
import JotaiProvider from "@/components/providers/jotai-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { lexend } from "./font";
import AuthProvider from "@/components/providers/auth-provider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fvent",
  description: "",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased dark`}>
        {/* <NextAuthProvider> */}
        <JotaiProvider>
          <QueryProvider>
            <AuthProvider data={session?.user}>
              <div className="min-h-screen">{children}</div>
            </AuthProvider>
          </QueryProvider>
        </JotaiProvider>
        {/* </NextAuthProvider> */}
        <Toaster />
      </body>
    </html>
  );
}

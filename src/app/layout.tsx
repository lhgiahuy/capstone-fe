import type { Metadata } from "next";
import "./globals.css";
import JotaiProvider from "@/components/providers/jotai-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { lexend } from "./font";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased`}>
        <JotaiProvider>
          <QueryProvider>
            <div className="min-h-screen bg-slate-100">{children}</div>
          </QueryProvider>
        </JotaiProvider>
        <Toaster />
      </body>
    </html>
  );
}

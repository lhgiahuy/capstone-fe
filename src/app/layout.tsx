import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Sidebar from "@/app/admin/_component/side-bar";
import AdminNavBar from "./admin/_component/admin-navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdminNavBar />
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[50px]">
            <Sidebar />
          </div>
          <div className="p-5 w-full md:max-w-[1340px]">{children}</div>
        </div>
      </body>
    </html>
  );
}

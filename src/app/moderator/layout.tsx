import Sidebar from "./(page)/_component/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full px-8">{children}</div>
    </div>
  );
}

import Sidebar from "../_component/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="hidden bg-slate-900 md:block min-h-screen">
          <Sidebar />
        </div>
        {/* <div className="p-5 w-full md:max-w-[1340px]">{children}</div> */}
        <div className="flex flex-col w-full">
          <div className="px-8 pb-2">{children}</div>
        </div>
      </div>
    </>
  );
}

import AdminNavBar from "./_component/admin-navbar";
import Sidebar from "./_component/side-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <div className="hidden bg-white md:block min-h-screen">
          <Sidebar />
        </div>
        {/* <div className="p-5 w-full md:max-w-[1340px]">{children}</div> */}
        <div className="flex flex-col w-full bg-slate-100 ">
          <AdminNavBar />
          <div className="px-8 pb-8">{children}</div>
        </div>
      </div>
    </>
  );
}

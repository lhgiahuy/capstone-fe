import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full">
        <div className="relative w-[40rem] h-screen">
          <Image
            src={"/images/auth-bg.png"}
            alt="auth background"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="grow shrink-0 flex justify-center items-center">
          {children}
        </div>
      </div>
    </>
  );
}

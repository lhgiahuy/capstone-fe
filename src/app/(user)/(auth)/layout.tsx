import Image from "next/image";

export default function UserAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full">
        <div className="relative w-[48rem] h-screen">
          <Image
            src={"/images/auth-bg.jpg"}
            alt="auth background"
            fill
            style={{ objectFit: "cover" }}
          />
          {/* <Image
            src={"/images/sker-logo-01.png"}
            alt="Logo"
            width={100}
            height={50}
            className="absolute top-10 left-10"
          /> */}
        </div>
        <div className="grow shrink-0 flex justify-center items-center">
          {children}
        </div>
      </div>
    </>
  );
}

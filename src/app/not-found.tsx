"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
        <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
          404
        </span>
        <h2 className="my-2 text-2xl font-bold">Oops...</h2>
        <p>
          Sorry, the page you are looking for does not exist or has been
          changed.
        </p>
        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={() => router.back()} variant="default" size="lg">
            Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="secondary"
            size="lg"
          >
            Home
          </Button>
        </div>
      </div>
    </>
  );
}

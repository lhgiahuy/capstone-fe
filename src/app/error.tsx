"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset(): void;
}) {
  const router = useRouter();

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-primary to-primary/50 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        Error!
      </span>
      <h2 className="my-2 text-2xl font-bold">Something&apos;s missing</h2>
      {/* <pre className="max-w-2xl whitespace-pre-wrap">
        {JSON.stringify(error.message, null, 2)}
      </pre> */}
      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={() => router.back()}
          variant="default"
          size="lg"
          className="rounded-full"
        >
          Back
        </Button>
        <Button
          onClick={() => reset()}
          variant="outline"
          size="lg"
          className="rounded-full"
        >
          Reload
        </Button>
        <Button
          onClick={() => router.replace("/")}
          variant="secondary"
          size="lg"
          className="rounded-full"
        >
          Home
        </Button>
      </div>
    </div>
  );
}

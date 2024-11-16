"use client";

import Link from "next/link";
import { CopyrightIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 bg-primary text-background md:px-8 md:py-0">
      <div className="container flex items-center justify-between md:h-24 md:flex-row">
        <div>
          <div className="flex gap-2 text-md items-center">
            <CopyrightIcon className="w-4 h-4" />
            2024 Sker
          </div>
        </div>
        <div className="flex flex-col items-center text-balance text-center text-sm leading-loose text-background">
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Link href="/su-kien">Sự kiện</Link>
              <Link href="#">Trợ giúp</Link>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="#">Terms</Link>
            <Link href="#">Policy</Link>
            <Link href="#">Security</Link>
          </div>
        </div>
        <div className="flex flex-col text-balance text-center text-sm leading-loose text-background">
          <p>Something</p>
        </div>
      </div>
    </footer>
  );
}

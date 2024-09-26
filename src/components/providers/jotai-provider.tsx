"use client";

import { atomStore } from "@/lib/atom/store";
import { Provider } from "jotai";

export default function JotaiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={atomStore}>{children}</Provider>;
}

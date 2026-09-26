"use client";

import { DataStoreProvider } from "@/lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <DataStoreProvider>{children}</DataStoreProvider>;
}

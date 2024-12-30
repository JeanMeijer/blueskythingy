import type { ReactNode } from "react";
import { QueryProvider } from "@/lib/query-provider";

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return <QueryProvider>{children}</QueryProvider>;
}

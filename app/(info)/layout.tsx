import GoBack from "@/components/ui/go-back";
import { ReactNode } from "react";

export default function InfoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen p-12">
      <GoBack />
      {children}
    </div>
  );
}

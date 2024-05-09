"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ChevronLeftIcon } from "lucide-react";

export default function GoBack() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="absolute top-4 left-4"
      variant="ghost"
      size="icon"
    >
      <ChevronLeftIcon />
    </Button>
  );
}

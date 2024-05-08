import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="fixed top-0 w-full h-16 border border-b border-muted">
      <nav className="flex h-full items-center px-2"></nav>
    </header>
  );
}

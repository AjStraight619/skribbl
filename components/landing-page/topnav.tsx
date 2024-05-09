import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="fixed top-0 w-full h-16 border border-b border-muted bg-gray-50">
      <div className="h-full flex items-center px-4">
        <div className="flex items-center gap-2">
          <Link
            className="font-poppins text-muted-foreground hover:text-primary transition-colors duration-100"
            href="/leaderboards"
          >
            Leaderboards
          </Link>
          <Link
            className="font-poppins text-muted-foreground hover:text-primary transition-colors duration-100"
            href="/how-to-play"
          >
            How To Play
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

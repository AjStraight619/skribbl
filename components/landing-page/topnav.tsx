import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <div className="fixed top-0 w-full h-16 border border-b border-muted bg-gray-50">
      <div className="h-full flex items-center px-2">
        <div className="ml-auto">
          <SignedOut>
            <SignInButton>Sign In</SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

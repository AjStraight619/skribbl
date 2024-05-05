import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import SubmitButton from "@/components/ui/submit-button";

export function SignInButton() {
  return (
    <Button variant="secondary" asChild>
      <Link href="/login">Sign In</Link>
    </Button>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <SubmitButton variant="secondary">Sign Out</SubmitButton>
    </form>
  );
}

export function RegisterButton() {
  return (
    <Button asChild>
      <Link href="/register">Register</Link>
    </Button>
  );
}

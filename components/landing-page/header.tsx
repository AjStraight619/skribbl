import { auth } from "@/auth";
import Logout from "../auth/logout";
import {
  RegisterButton,
  SignInButton,
  SignOutButton,
} from "../auth/auth-buttons";

export default async function Header() {
  const session = await auth();
  return (
    <header className="fixed top-0 w-full h-16 border border-b border-muted">
      <nav className="flex h-full items-center px-2">
        <div></div>
        <div className="ml-auto inline-flex gap-x-2">
          {!session ? (
            <>
              <RegisterButton />
              <SignInButton />
            </>
          ) : (
            <SignOutButton />
          )}
        </div>
      </nav>
    </header>
  );
}

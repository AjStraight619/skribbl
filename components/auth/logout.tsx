import { signOut } from "@/auth";
import { Button } from "../ui/button";
import SubmitButton from "../ui/submit-button";

export default function Logout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirect: true,
          redirectTo: "/",
        });
      }}
    >
      <SubmitButton>Logout</SubmitButton>
    </form>
  );
}

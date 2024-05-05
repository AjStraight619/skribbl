import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-button";

export default function JoinRoom() {
  return (
    <form action={async (formData) => {}} className="flex flex-row gap-1">
      <Input placeholder="Enter room link" />

      <SubmitButton>Join</SubmitButton>
    </form>
  );
}

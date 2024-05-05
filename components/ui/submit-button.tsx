"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = ButtonProps & {
  isPending?: boolean;
};

export default function SubmitButton({
  isPending,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending}>
      {pending || isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  );
}

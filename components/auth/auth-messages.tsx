import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import React from "react";

type SuccessMessageProps = {
  success?: boolean;
  successMessage?: string;
};

type ErrorMessageProps = {
  errorMessage?: string;
};

export const SuccessMessage = ({
  success,
  successMessage,
}: SuccessMessageProps) => {
  return (
    <>
      {success && (
        <div className="w-full p-2 rounded-md bg-emerald-500/30 flex flex-row items-center gap-x-2 text-emerald-400 text-center">
          <CircleCheckIcon />
          <p className="text-center">{successMessage || ""}</p>
        </div>
      )}
    </>
  );
};

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <>
      {errorMessage && (
        <div className="w-full p-2 rounded-md bg-rose-500/30 flex flex-row items-center gap-x-2 text-rose-400 text-center flex-wrap">
          <TriangleAlertIcon />
          <p className="text-center">{errorMessage}</p>
        </div>
      )}
    </>
  );
};

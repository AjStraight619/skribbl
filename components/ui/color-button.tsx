import { Color } from "@/types/type";
import { Button } from "./button";
import { colorToCss } from "@/lib/utils";
import { CircleIcon } from "lucide-react";

type ColorButtonProps = {
  color: Color;
  onClick: () => void;
};

export default function ColorButton({ color, onClick }: ColorButtonProps) {
  const bgColor = colorToCss(color);
  return (
    <button onClick={onClick} className="rounded-full p-0">
      <CircleIcon fill={bgColor} />
    </button>
  );
}

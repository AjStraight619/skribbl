import { Color } from "@/types/type";

import { colorToCss } from "@/lib/utils";
import { CircleIcon } from "lucide-react";

type ColorButtonProps = {
  onClick: () => void;
  color: string;
  strokeWidth: number;
};

export default function StrokeWidthButton({
  onClick,
  color,
  strokeWidth,
}: ColorButtonProps) {
  return (
    <button onClick={onClick} className="rounded-full p-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="rounded-full"
      >
        <circle cx="12.1" cy="12.1" r={strokeWidth} fill={color} />
      </svg>
    </button>
  );
}

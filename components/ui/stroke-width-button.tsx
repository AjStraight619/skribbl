import { Color } from "@/types/type";

import { colorToCss } from "@/lib/utils";
import { CircleIcon } from "lucide-react";

type ColorButtonProps = {
  color: Color;
  onClick: () => void;
  size: number;
};

export default function StrokeWidthButton({
  color,
  onClick,
  size,
}: ColorButtonProps) {
  const bgColor = colorToCss(color);
  return (
    <button onClick={onClick} className="rounded-full p-0">
      <CircleIcon size={size} fill={bgColor} />
    </button>
  );
}

import React, { SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CircleIcon } from "lucide-react";
import { Color } from "@/types/type";
import { colorToCss } from "@/lib/utils";
import StrokeWidthButton from "../ui/stroke-width-button";
import IconButton from "../icon-button";

type StrokeSelectionProps = {
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  color: string;
  isActive?: boolean;
};

export default function StrokeSelection({
  strokeWidth,
  setStrokeWidth,
  color,
}: StrokeSelectionProps) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const strokeWidthOptions = [
    {
      strokeWidth: 5,
    },
    {
      strokeWidth: 7,
    },
    {
      strokeWidth: 15,
    },
  ];

  const handleClick = (strokeWidth: number) => {
    setStrokeWidth(strokeWidth);
    setPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant={null}>
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
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <ul className="flex flex-col items-center justify-evenly">
          {strokeWidthOptions.map((option, idx) => (
            <li key={idx}>
              <StrokeWidthButton
                strokeWidth={option.strokeWidth}
                onClick={() => handleClick(option.strokeWidth)}
                color={color}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

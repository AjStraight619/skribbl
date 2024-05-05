import React, { SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CircleIcon } from "lucide-react";
import { Color } from "@/types/type";
import { colorToCss } from "@/lib/utils";
import StrokeWidthButton from "../ui/stroke-width-button";

type StrokeSelectionProps = {
  strokeWidth: number;
  setStrokeWidth: React.Dispatch<SetStateAction<number>>;
  lastUsedColor: Color;
};

export default function StrokeSelection({
  strokeWidth,
  setStrokeWidth,
  lastUsedColor,
}: StrokeSelectionProps) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const strokeWidthOptions = [
    {
      strokeWidth: 5,
      size: 10,
    },
    {
      strokeWidth: 10,
      size: 15,
    },
    {
      strokeWidth: 15,
      size: 20,
    },
  ];

  const handleClick = (strokeWidth: number) => {
    setStrokeWidth(strokeWidth);
    setPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <CircleIcon fill={colorToCss(lastUsedColor)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <ul className="flex flex-col items-center justify-evenly">
          {strokeWidthOptions.map((option, idx) => (
            <li key={idx}>
              <StrokeWidthButton
                size={option.size}
                onClick={() => handleClick(option.strokeWidth)}
                color={lastUsedColor}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

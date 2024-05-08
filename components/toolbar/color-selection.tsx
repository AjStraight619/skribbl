import { Color } from "@/types/type";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ColorButton from "../ui/color-button";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { colorToCss } from "@/lib/utils";
import { HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  color: string;
  setColor: (color: string) => void;
};

const colors = [
  { r: 243, g: 82, b: 35 },
  { r: 255, g: 198, b: 38 },
  { r: 68, g: 202, b: 99 },
  { r: 39, g: 142, b: 237 },
  { r: 155, g: 105, b: 245 },
  { r: 252, g: 142, b: 42 },
  { r: 82, g: 82, b: 82 },
  { r: 255, g: 255, b: 255 },
  { r: 0, g: 0, b: 0 },
  { r: 92, g: 64, b: 51 },
];

export default function ColorSelection({ color, setColor }: ColorPickerProps) {
  const [isPopoverOpen, setPopOverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopOverOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant={null} onClick={() => setPopOverOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            stroke-width="1"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="red" />
            <circle cx="17.5" cy="10.5" r=".5" fill="orange" />
            <circle cx="8.5" cy="7.5" r=".5" fill="yellow" />
            <circle cx="6.5" cy="12.5" r=".5" fill="green" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <HexColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}

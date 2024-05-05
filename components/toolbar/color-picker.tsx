import { Color } from "@/types/type";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ColorButton from "../ui/color-button";
import ToolbarButton from "../ui/toolbar-button";
import { PaintBucket, PaintBucketIcon, PaletteIcon } from "lucide-react";
import { colorToCss } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

type ColorPickerProps = {
  setLastUsedColor: (color: Color) => void;
  lastUsedColor: Color;
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

export default function ColorPicker({
  setLastUsedColor,
  lastUsedColor,
}: ColorPickerProps) {
  const handleColorChange = (color: Color) => {
    setLastUsedColor(color);
    setPopOverOpen(false);
  };
  const [isPopoverOpen, setPopOverOpen] = useState(false);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopOverOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" onClick={() => setPopOverOpen(true)}>
          <PaletteIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="flex flex-row items-center gap-2 flex-wrap">
          {colors.map((color, idx) => (
            <li key={idx}>
              <ColorButton
                color={color}
                onClick={() => handleColorChange(color)}
              />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

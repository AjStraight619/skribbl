import React from "react";
import IconButton from "@/components/icon-button";
import { Color } from "@/types/type";
import { colorToCss } from "@/lib/utils";

type Props = {
  isActive: boolean;
  onClick: () => void;
  color: string;
};

export default function RectangleButton({ isActive, onClick, color }: Props) {
  return (
    <IconButton isActive={isActive} onClick={onClick}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 12H12V24H24V12ZM10 10V26H26V10H10Z"
          fill={color}
        />
      </svg>
    </IconButton>
  );
}

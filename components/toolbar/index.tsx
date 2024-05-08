import React from "react";

import { CanvasMode, LayerType, CanvasState, Color } from "@/types/type";
import SelectionButton from "./selection-button";
import PencilButton from "./pencil-button";
import RectangleButton from "./rectangle-button";
import EllipseButton from "./ellipse-button";
import StrokeSelection from "./stroke-selection";
import ColorSelection from "./color-selection";
import { Separator } from "../ui/separator";
import IconButton from "../icon-button";
import { useDeleteLayers } from "@/hooks/useDeleteLayers";
import { Trash2Icon } from "lucide-react";
import { HexColorPicker } from "react-colorful";

type Props = {
  canvasState: CanvasState;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  setCanvasState: (newState: CanvasState) => void;

  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  color: string;
  setColor: (color: string) => void;
};

export default function ToolsBar({
  canvasState,
  setCanvasState,
  strokeWidth,
  setStrokeWidth,
  color,
  setColor,
  undo,
  redo,
  canUndo,
  canRedo,
}: Props) {
  const deleteAllLayers = useDeleteLayers();
  return (
    <div className="absolute bottom-2 -translate-x-1/2 left-1/2 p-2 bg-white shadow-xl rounded-lg">
      <div className="flex items-center">
        <SelectionButton
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          color={color}
        />
        <PencilButton
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          color={color}
        />
        <RectangleButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          color={color}
        />
        <EllipseButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          color={color}
        />
        <StrokeSelection
          color={color}
          setStrokeWidth={setStrokeWidth}
          strokeWidth={strokeWidth}
        />
        <ColorSelection color={color} setColor={setColor} />

        <Separator orientation="vertical" className="h-full" />
        <IconButton onClick={deleteAllLayers}>
          <Trash2Icon />
        </IconButton>
      </div>
    </div>
  );
}

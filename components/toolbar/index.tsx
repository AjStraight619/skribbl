import React from "react";

import { CanvasMode, LayerType, CanvasState, Color } from "@/types/type";
import styles from "./index.module.css";
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

type Props = {
  canvasState: CanvasState;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  setCanvasState: (newState: CanvasState) => void;
  setLastUsedColor: (color: Color) => void;
  lastUsedColor: Color;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export default function ToolsBar({
  canvasState,
  setCanvasState,
  lastUsedColor,
  setLastUsedColor,
  strokeWidth,
  setStrokeWidth,
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
        />
        <PencilButton
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          lastUsedColor={lastUsedColor}
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
          lastUsedColor={lastUsedColor}
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
          lastUsedColor={lastUsedColor}
        />
        <StrokeSelection
          lastUsedColor={lastUsedColor}
          setStrokeWidth={setStrokeWidth}
          strokeWidth={strokeWidth}
        />
        <ColorSelection
          lastUsedColor={lastUsedColor}
          setLastUsedColor={setLastUsedColor}
        />
        <Separator orientation="vertical" className="h-full" />
        <IconButton onClick={deleteAllLayers}>
          <Trash2Icon />
        </IconButton>
      </div>
    </div>
  );
}

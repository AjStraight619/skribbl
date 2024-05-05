import { CanvasMode, CanvasState, Color } from "@/types/type";
import { Button } from "../ui/button";
import { PencilIcon, RedoIcon, TrashIcon, UndoIcon } from "lucide-react";
import ToolbarButton from "../ui/toolbar-button";
import SelectionButton from "./selection-button";
import { Separator } from "../ui/separator";
import ColorPicker from "./color-picker";
import { colorToCss } from "@/lib/utils";

type ToolbarProps = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  setLastUsedColor: (color: Color) => void;
  lastUsedColor: Color;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  deleteAllLayers: () => void;
};

export default function Toolbar({
  canvasState,
  setCanvasState,
  setLastUsedColor,
  lastUsedColor,
  undo,
  redo,
  canUndo,
  canRedo,
  deleteAllLayers,
}: ToolbarProps) {
  return (
    <div className="absolute bottom-2 transform -translate-x-1/2 left-1/2 p-4 bg-gray-50 rounded-lg shadow-xl h-16">
      <div className="h-full flex items-center gap-2">
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

        <ToolbarButton
          isActive={canvasState.mode === CanvasMode.Pencil}
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          size="icon"
        >
          <PencilIcon fill={colorToCss(lastUsedColor)} />
        </ToolbarButton>
        <ColorPicker
          lastUsedColor={lastUsedColor}
          setLastUsedColor={setLastUsedColor}
        />
        <Separator orientation="vertical" />
        <ToolbarButton onClick={undo} size="icon">
          <UndoIcon />
        </ToolbarButton>
        <ToolbarButton onClick={redo} size="icon">
          <RedoIcon />
        </ToolbarButton>
        <ToolbarButton onClick={deleteAllLayers} size="icon">
          <TrashIcon />
        </ToolbarButton>
      </div>
    </div>
  );
}

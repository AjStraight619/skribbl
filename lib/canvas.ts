import { CanvasMode, CanvasMouseDown } from "@/types/type";
import { fabric } from "fabric";

export function initializeCanvas({
  fabricCanvasRef,
  canvasRef,
}: {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
  const canvasElement = document.getElementById("canvas");

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  fabricCanvasRef.current = canvas;

  return canvas;
}

export const handleCanvasMouseDown = ({
  options,
  canvas,
  isDrawing,
  canvasState,
}: CanvasMouseDown) => {
  const pointer = canvas.getPointer(options.e);
  if (canvasState.mode === CanvasMode.Pencil) {
    canvas.isDrawingMode = true;
  }
};

"use client";

import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { colorToCss } from "@/lib/utils";
import { CanvasMode, CanvasState, Color } from "@/types/type";
import { handleCanvasMouseDown, initializeCanvas } from "@/lib/canvas";

export default function Cavas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  //   const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 252,
    g: 142,
    b: 42,
  });

  useEffect(() => {
    const canvas = initializeCanvas({ fabricCanvasRef, canvasRef });

    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = colorToCss(lastUsedColor);
    canvas.freeDrawingBrush.width = 5;

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        canvasState,
        isDrawing,
      });
    });

    canvas.on("mouse:move", (options) => {});
  }, [lastUsedColor, canvasRef, canvasState]);

  return (
    <div className=" ">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border border-black"
        width={750}
        height={750}
      />
    </div>
  );
}

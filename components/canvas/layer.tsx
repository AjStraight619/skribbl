import { useStorage } from "@/liveblocks.config";
import React, { memo } from "react";
import Path from "@/components/canvas/path";
import { CanvasMode, LayerType } from "@/types/type";
import { colorToCss } from "@/lib/utils";
import Ellipse from "./ellipse";
import Rectangle from "./rectangle";

type Props = {
  id: string;
  mode: CanvasMode;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const Layer = memo(
  ({ mode, onLayerPointerDown, id, selectionColor }: Props) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) {
      return null;
    }

    const isAnimated =
      mode !== CanvasMode.Translating && mode !== CanvasMode.Resizing;

    switch (layer.type) {
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill}
            stroke={selectionColor}
            strokeWidth={layer.strokeWidth}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  }
);

Layer.displayName = "Layer";

export default Layer;

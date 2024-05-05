"use client";

import Canvas from "./canvas";
// import Canvas from "./canvas";
import Lobby from "./lobby";

export function Live() {
  return (
    <div className="h-screen w-full">
      <Lobby />
      <Canvas />
    </div>
  );
}

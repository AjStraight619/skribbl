"use client";

import Canvas from "./canvas";
import Chat from "./chat";
import Lobby from "./lobby";
import { PreGameLobby } from "./lobby/pre-game-lobby";
import WordDisplay from "./words";

export function Live() {
  return (
    <div className="h-screen w-full">
      <PreGameLobby />
      <WordDisplay />
      <Lobby />
      <Canvas />
      <Chat />
    </div>
  );
}

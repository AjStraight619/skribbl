"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer, Player } from "@/types/type";
import { useRound } from "@/hooks/useRound";

type RoomProps = {
  children: ReactNode;
  roomId: string;
};

export function Room({ children, roomId }: RoomProps) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        selection: [],
        cursor: null,
        pencilDraft: null,
        penColor: null,
        strokeWidth: null,
        isLeader: false,
        messages: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
        players: new LiveList<LiveObject<Player>>(),
        round: new LiveObject({
          currentRound: 0,
          currentWord: "",
          timer: 45,
          timerActive: false,
          revealedChars: [],
          timePerRound: 45,
          isRoundOver: false,
          isRoundStarted: false,
        }),
        game: new LiveObject({
          isStarted: false,
          isFinished: false,
          maxRounds: 7,
          wordDifficuly: "easy",
        }),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

import {
  useMutation,
  useOthersListener,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Player from "./player";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "../ui/use-toast";
import { LiveObject } from "@liveblocks/client";
import { Player as PlayerType } from "@/types/type";

export default function Lobby() {
  const self = useSelf();
  const renderRef = useRef(0);

  const isExistingUser = useCallback(
    (players: readonly PlayerType[], playerId: string) => {
      return players.some((player) => player.id === playerId);
    },
    []
  );

  const players = useStorage((root) => root.players);

  useEffect(() => {
    console.log("This compontent re-rendered: ", renderRef.current++);
  }, []);

  const addPlayer = useMutation(({ storage, self }, playerId: string) => {
    const currentPlayers = storage.get("players").toImmutable();
    if (!isExistingUser(currentPlayers, playerId)) {
      const newPlayer = new LiveObject<PlayerType>({
        id: playerId,
        username: self.info.username,
        score: 0,
        avatar: self.info.avatar,
        isLeader: currentPlayers.length === 0,
        isDrawing: false,
        isTurn: false,
      });

      storage.get("players").push(newPlayer);
    }
  }, []);

  const removePlayer = useMutation(({ storage }, playerId) => {
    const players = storage.get("players");
    const index = players
      .toImmutable()
      .findIndex((player) => player.id === playerId);
    if (index !== -1) {
      players.delete(index);
    }
  }, []);

  useOthersListener(({ type, user }) => {
    switch (type) {
      case "enter":
        toast({
          duration: 1000,
          description: `${user.info.username} joined up!`,
        });
      case "leave":
        toast({
          duration: 1000,
          description: `${user.info.username} bounced`,
        });
        removePlayer(user.id);
    }
  });

  useEffect(() => {
    if (self && players && !isExistingUser(players, self.id)) {
      addPlayer(self.id);
    }
  }, [self, players, addPlayer, isExistingUser]);

  return (
    <Card className="absolute transform -translate-y-1/2 top-1/2 left-2 select-none">
      <CardHeader>
        <CardTitle className="text-center font-poppins tracking-widest">
          Players
        </CardTitle>
      </CardHeader>
      <CardContent>
        {players && (
          <div className="flex flex-col gap-y-2">
            {players.map((player) => (
              <Player key={player.id} {...player} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

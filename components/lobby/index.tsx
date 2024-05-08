import {
  useMutation,
  useOthersListener,
  useRoom,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Player from "./player";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "../ui/use-toast";
import { LiveObject } from "@liveblocks/client";
import { Player as PlayerType } from "@/types/type";
import { cn } from "@/lib/utils";
import { useRound } from "@/hooks/useRound";

type LobbyProps = {
  className?: string;
  absolute?: boolean;
  showRound?: boolean;
};

export default function Lobby({
  className,
  absolute = true,
  showRound = true,
}: LobbyProps) {
  const self = useSelf();
  const { round } = useRound();
  const { currentRound } = round;
  const room = useRoom();

  const players = useStorage((root) => root.players);
  const numRounds = useStorage((root) => root.game.maxRounds);

  const isExistingUser = useCallback(
    (players: readonly PlayerType[], playerId: string) => {
      return players.some((player) => player.id === playerId);
    },
    []
  );

  const addPlayer = useMutation(
    ({ storage, self, setMyPresence }, playerId: string) => {
      const currentPlayers = storage.get("players").toImmutable();

      if (!isExistingUser(currentPlayers, playerId)) {
        const newPlayer = new LiveObject<PlayerType>({
          id: playerId,
          username: self.info.username,
          score: 0,
          avatar: self.info.avatar,
          isLeader:
            currentPlayers.length === 0 ||
            currentPlayers.find((player) => player.id)?.isLeader ||
            false,
          isDrawing: false,
          isTurn: false,
          didGuessWord: false,
          messages: [],
        });
        setMyPresence({ isLeader: newPlayer.toObject().isLeader });
        storage.get("players").push(newPlayer);
      }
    },
    []
  );

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
    <div
      className={cn(
        `${
          absolute
            ? "absolute transform -translate-y-1/4 top-1/4 left-2 flex flex-col p-1"
            : ""
        } select-none`,
        className
      )}
    >
      {showRound && (
        <p className="text-xl font-poppins text-start mb-1">
          Round: {currentRound} / {numRounds}
        </p>
      )}
      <Card className="bg-background">
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
    </div>
  );
}

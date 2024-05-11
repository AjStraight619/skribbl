import {
  useMutation,
  useOthers,
  useOthersListener,
  useRoom,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Player from "./player";
import { useCallback, useEffect } from "react";
import { toast } from "../ui/use-toast";
import { LiveObject } from "@liveblocks/client";
import { Player as PlayerType } from "@/types/type";
import { cn } from "@/lib/utils";

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
  const currentRound = useStorage((root) => root.round.currentRound);

  const players = useStorage((root) => root.players);
  const numRounds = useStorage((root) => root.game.maxRounds);

  const isExistingUser = useCallback(
    (players: readonly PlayerType[], playerId: string) => {
      return players.some((player) => player.id === playerId);
    },
    []
  );

  const others = useOthers();

  const addPlayer = useMutation(
    ({ storage, self, setMyPresence }, playerId: string) => {
      const currentPlayers = storage.get("players").toImmutable();

      const playerExists = currentPlayers.some((p) => p.id === self.id);
      if (playerExists) return;
      const newPlayer = new LiveObject<PlayerType>({
        id: playerId,
        username: self.info.username,
        score: 0,
        avatar: self.info.avatar,
        isLeader: others.length === 0,
        isDrawing: false,
        isTurn: false,
        didGuessWord: false,
        messages: [],
        hasHadTurn: false,
      });
      storage.get("players").push(newPlayer);
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
        break;
      case "leave":
        toast({
          duration: 1000,
          description: `${user.info.username} bounced`,
        });
        removePlayer(user.id);
        break;
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
      <Card>
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

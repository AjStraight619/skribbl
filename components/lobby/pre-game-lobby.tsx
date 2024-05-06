"use client";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useMutation, useStorage } from "@/liveblocks.config";
import Lobby from ".";
import { Button } from "../ui/button";
import { useRound } from "@/hooks/useRound";
import { useState } from "react";

export function PreGameLobby() {
  const [wordDifficulty, setWordDifficulty] = useState("");
  const { startNewRound } = useRound();
  const game = useStorage((root) => root.game);
  const isStarted = game.isStarted;

  const handleStartGame = useMutation(({ storage }) => {
    const game = storage.get("game");
    game.set("isStarted", true);
    startNewRound();
  }, []);

  return (
    <Dialog open={!isStarted} onOpenChange={handleStartGame}>
      <DialogContent>
        <Lobby showRound={false} absolute={false} className="mt-4" />

        <DialogFooter>
          <Button onClick={handleStartGame}>StartGame</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

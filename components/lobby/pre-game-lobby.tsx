"use client";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import {
  useMutation,
  useMyPresence,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import Lobby from ".";
import { Button } from "../ui/button";
import { useRound } from "@/hooks/useRound";
import { ChangeEvent, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { WordDifficulty } from "@/types/type";

export function PreGameLobby() {
  const { startNewTurn } = useRound();
  const timer = useStorage((root) => root.round.timer);
  // const game = useStorage((root) => root.game);
  const isStarted = useStorage((root) => root.game.isStarted);
  const [myPresence, updateMyPresence] = useMyPresence();
  const isLeader = useStorage((root) => root.players.find((p) => p.isLeader));

  console.log("isLeader: ", isLeader);

  const myId = useSelf((me) => me.id);

  // useEffect(() => {
  //   if (!players) return;
  //   const isLeader = players.find((player) => player.id === myId)?.isLeader;
  //   updateMyPresence({ isLeader: isLeader });
  // }, [players, myId, updateMyPresence]);

  const handleStartGame = useMutation(({ storage }) => {
    const game = storage.get("game");
    game.set("isStarted", true);
    startNewTurn();
  }, []);

  const handleTimerChange = useMutation(
    ({ storage }, e: ChangeEvent<HTMLInputElement>) => {
      const currentNumber = e.target.valueAsNumber;
      if (currentNumber > 100) return;
      const round = storage.get("round");
      round.set("timer", currentNumber);
      round.set("timePerRound", currentNumber);
    },
    []
  );

  const handleModeChange = useMutation(({ storage }, mode: WordDifficulty) => {
    storage.get("game").set("wordDifficuly", mode);
  }, []);

  const handleRoundChange = useMutation(({ storage }, round: string) => {
    const parsedRound = parseInt(round);
    storage.get("game").set("maxRounds", parsedRound);
  }, []);

  return (
    <Dialog
      open={!isStarted}
      onOpenChange={handleStartGame}
      defaultOpen={false}
    >
      <DialogContent
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Lobby showRound={false} absolute={false} className="" />
        <div className="grid grid-cols-2 gap-2 font-poppins">
          <div>
            <Label>Time per round:</Label>
            <Input
              disabled={!isLeader}
              onChange={handleTimerChange}
              type="number"
              value={timer}
              min={45}
              max={100}
            />
          </div>
          <div>
            <Label htmlFor="mode">Mode:</Label>
            <Select
              onValueChange={(value) =>
                handleModeChange(value as WordDifficulty)
              }
              disabled={!isLeader}
            >
              <SelectTrigger id="mode">
                <SelectValue placeholder="Easy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <Label htmlFor="rounds">Rounds:</Label>
            <Select
              onValueChange={(value) => handleRoundChange(value)}
              disabled={!isLeader}
            >
              <SelectTrigger id="rounds">
                <SelectValue defaultValue={7} placeholder="7" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button disabled={!isLeader} onClick={handleStartGame}>
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

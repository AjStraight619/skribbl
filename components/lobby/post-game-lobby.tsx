import { useMutation, useSelf, useStorage } from "@/liveblocks.config";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { updateLeaderboard } from "@/actions/leaderboard";

export default function PostGameLobby() {
  const isGameCompleted = useStorage(
    (root) => root.round.currentRound === root.game.maxRounds
  );

  const [isDialogOpen, setDialogOpen] = useState(isGameCompleted);

  const myId = useSelf((me) => me.id);

  const players = useStorage((root) =>
    root.players.map((player) => ({
      userId: player.id,
      score: player.score,
    }))
  );

  const { data, error } = useQuery({
    queryKey: ["gameOver"],
    queryFn: () => updateLeaderboard(players.find((p) => p.userId === myId)!),
    enabled: !!isGameCompleted,
  });

  console.log("data: ", data);
  console.log("error: ", error);
  const handleGameEnd = useMutation(() => {}, []);

  if (!isGameCompleted) return null;

  async function updateScores() {
    const res = await fetch("/api/");
  }

  return (
    <Dialog open={isGameCompleted} onOpenChange={handleGameEnd}>
      <DialogContent>
        Game over
        <DialogFooter>
          <Button onClick={() => handleGameEnd()}>Restart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

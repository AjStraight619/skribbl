"use server";

import { db } from "@/lib/db";

type Player = {
  userId: string;
  score: number;
};

export async function updateLeaderboard(players: Player) {
  console.log("these are the players in the players array: ", players);

  // const newScores = await db.player.update({
  //   where: {
  //     id:
  //   }
  // })
  return {};
}

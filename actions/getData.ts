// ! These functions will only be used on the server, we are importing 'server-only' so that the client cannot invoke these function.
// ! These functions will be used to get data in the server components

import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import "server-only";

export async function getPlayer(userId: string) {
  const playerInfo = await db.player.findUnique({
    where: {
      id: userId,
    },
  });

  return playerInfo;
}

export async function getRoomId(id: string) {
  try {
    const room = await db.room.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!room) {
      return null;
    }

    return room.id;
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getLeaderboardData() {}

export async function getOpenRooms() {
  const rooms = await db.room.findMany({
    where: {
      isOpen: "yes",
    },
    select: {
      id: true,
      name: true,
      numPlayers: true,
    },
  });

  return rooms;
}

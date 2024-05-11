import { Room } from "@/components/room";
import { Live } from "@/components/index";
import { getRoomId } from "@/actions/getData";
import { redirect } from "next/navigation";

import { Liveblocks } from "@liveblocks/node";
import { auth } from "@clerk/nextjs/server";
import { Game, Player } from "@/types/type";

type RoomProps = {
  params: {
    roomId: string;
  };
};

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export default async function Page({ params: { roomId } }: RoomProps) {
  const dbRoomId = await getRoomId(roomId);
  // const session = auth();
  if (!dbRoomId) {
    redirect("/not-found");
  }

  // const roomStorage = await liveblocks.getStorageDocument(dbRoomId, "json");

  // const game = roomStorage["game"] as Game;
  // const players = roomStorage["players"] as Player[];

  // console.log(JSON.stringify(game.isStarted, null, 2));
  // console.log(JSON.stringify(players, null, 2));

  return (
    <Room roomId={roomId}>
      <Live />
    </Room>
  );
}

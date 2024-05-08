import { NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function GET() {
  const rooms = await liveblocks.getRooms();

  //   await liveblocks.deleteRoom(rooms.data[0].id);

  console.log("In the test api route: ", rooms);

  //   const roomIdsToDelete = [];
  //   const { data: roomsData } = rooms;

  //   console.log(roomsData);
  //   for (const room of roomsData) {
  //     // if (shouldDeleteRoom(room.lastConnectionAt)) {
  //     //   liveblocks.deleteRoom(room.id);
  //     // }
  //   }

  //   return NextResponse.next();

  return NextResponse.json({ data: "Yo" });
}

function shouldDeleteRoom(lastConnectionTime: Date | undefined) {
  if (!lastConnectionTime) return false;
  const lastConnectionDate = new Date(lastConnectionTime);
  const now = new Date();
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

  return (
    now.getTime() - lastConnectionDate.getTime() > twentyFourHoursInMilliseconds
  );
}

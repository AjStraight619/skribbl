import { NextResponse } from "next/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function GET() {
  const rooms = await liveblocks.getRooms();

  const roomIdsToDelete = [];
  const { data: roomsData } = rooms;
  for (const room of roomsData) {
    if (shouldDeleteRoom(room.lastConnectionAt)) {
      roomIdsToDelete.push(room.id);
    }
  }

  if (roomIdsToDelete.length > 0) {
    const roomManagementUrl = new URL(
      "http://localhost:3000/api/liveblocks-room-management"
    );
    roomManagementUrl.searchParams.set("roomIds", roomIdsToDelete.join(","));
    return NextResponse.redirect(roomManagementUrl);
  }

  return new Response("No rooms to delete", { status: 200 });
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

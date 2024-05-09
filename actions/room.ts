"use server";

import { db } from "@/lib/db";
import { CreateRoomSchema } from "@/lib/schemas";
import { z } from "zod";

export async function createRoom(values: z.infer<typeof CreateRoomSchema>) {
  const validatedValues = CreateRoomSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "One of the form values you entered was not correct",
      success: "",
    };
  }

  const { displayName, roomName, numPlayers, openRoom } = validatedValues.data;

  const newRoom = await db.room.create({
    data: {
      name: roomName,
    },
  });
}

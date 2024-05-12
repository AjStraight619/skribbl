"use server";

import { db } from "@/lib/db";
import { CreateRoomSchema } from "@/lib/schemas";
import { getErrorMessage } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export async function createRoom(values: z.infer<typeof CreateRoomSchema>) {
  const validatedValues = CreateRoomSchema.safeParse(values);

  const session = auth();

  if (!session || !session.userId) {
    return {
      success: null,
      error: "You must be logged in to create a room",
    };
  }

  const userId = session.userId;

  if (!validatedValues.success) {
    return {
      error: "One of the form values you entered was not correct",
      success: null,
    };
  }

  const { roomName, openRoom } = validatedValues.data;

  try {
    const newRoom = await db.room.create({
      data: {
        name: roomName,
        isOpen: openRoom,
        numPlayers: 1,
        player: {
          connect: {
            id: userId,
          },
        },
      },

      select: {
        id: true,
      },
    });

    if (!newRoom) {
      return {
        success: null,
        error: "Something went wrong when creating room",
      };
    }

    return {
      success: {
        message: "Successfully created room",
        roomId: newRoom.id,
      },
      error: null,
    };
  } catch (err) {
    return {
      success: null,
      error: getErrorMessage(err),
    };
  }
}

export async function joinRoom() {}

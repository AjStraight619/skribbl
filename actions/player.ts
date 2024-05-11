"use server";

import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

type CreatePlayerResponse = {
  error: string | null;
  success:
    | false
    | {
        ok: boolean;
        user: {
          id: string | null;
        };
      };
};

export async function updatePlayerScore() {}

export async function createPlayer(
  userId: string
): Promise<CreatePlayerResponse> {
  const session = auth();
  if (!session || !session.userId) {
    return {
      error: "You must be logged in to continue.",
      success: {
        ok: false,
        user: {
          id: null,
        },
      },
    };
  }
  const user = await currentUser();
  if (!user || !user.firstName || !user.fullName) {
    return {
      error: "We had trouble getting your name, make sure you are logged in.",
      success: {
        ok: false,
        user: {
          id: null,
        },
      },
    };
  }

  try {
    const newPlayer = await db.player.create({
      data: {
        id: userId,
        isProfileComplete: false,
        name: user.fullName,
      },
      select: {
        id: true,
      },
    });

    return {
      error: null,
      success: {
        ok: newPlayer !== null,
        user: {
          id: newPlayer.id,
        },
      },
    };
  } catch (err) {
    return {
      error: getErrorMessage(err),
      success: false,
    };
  }
}

export async function finishSettingUpProfile(userId: string) {}

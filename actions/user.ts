"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function getUser(userId: string) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
}

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  console.log("in getUserByEmail function ");
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return;
    return user;
  } catch (err) {
    // TODO: Implement getErrorMessage util function.
    throw new Error("Something went wrong");
  }
};

export async function getUsersData(userIds: string[]) {
  const userData = await db.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
  return userData;
}

export async function updateUserName() {}

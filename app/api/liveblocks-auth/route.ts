import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const { room } = await request.json();

  const user = await currentUser();

  const userMetadata = {
    username: user?.firstName || "Player",
    avatar: user?.imageUrl || "",
  };

  const session = liveblocks.prepareSession(
    user!.id,
    { userInfo: userMetadata } // Optional
  );

  session.allow(`${room}`, session.FULL_ACCESS);

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  //   session.allow(`${user.organization}:*`, session.READ_ACCESS);
  //   session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}

function getTestUser() {
  return {
    id: nanoid(),
    info: {
      username: "Test User",
    },
  };
}

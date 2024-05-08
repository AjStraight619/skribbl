import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const { room } = await request.json();

  const user = await currentUser();
  const {userId} = auth()

  if (!userId) return NextResponse.redirect(new URL('/sign-in', request.url))


  const userMetadata = {
    username: user?.firstName || "Player",
    avatar: user?.imageUrl || "",
  };

  const session = liveblocks.prepareSession(
    userId,
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

import { auth } from "@/auth";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/actions/user";
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const { room } = await request.json();
  const userSession = await auth();
  if (!userSession || !userSession?.user?.id) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const userId = userSession.user.id;
  const user = await getUser(userId);

  console.log("user: ", user);

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const userMetadata = {
    username: user.displayName || "Player",
    avatar: user.avatar || "",
  };

  const session = liveblocks.prepareSession(
    user.id,
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

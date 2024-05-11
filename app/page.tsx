import { createPlayer } from "@/actions/player";
import CreateRoom from "@/components/landing-page/create-room";
import JoinRoom from "@/components/landing-page/join-room";
import TopNav from "@/components/landing-page/topnav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function checkIsExistingPlayer(userId: string) {
  const player = await db.player.findUnique({
    where: {
      id: userId,
    },
  });

  return player !== null;
}

export default async function Home() {
  const session = auth();

  // const res = await fetch("http://localhost:3000/api/test", {
  //   cache: "no-store",
  // });

  // if (res.ok) {
  //   const data = await res.json();
  //   console.log("This is the data from the home page: ", data);
  // }

  console.log(JSON.stringify(session, null, 2));

  if (!session || !session.userId) {
    redirect("/sign-in");
  }

  const isExistingPlayer = await checkIsExistingPlayer(session.userId);

  console.log("isExistingPlayer?: ", isExistingPlayer);

  if (!isExistingPlayer) {
    const newPlayer = await createPlayer(session.userId);

    console.log("new player: ", newPlayer);
    // if (newPlayer.success && newPlayer.success.user.id) {
    //   redirect(`profile/${newPlayer.success.user.id}/finish`);
    // }
  }

  return (
    <main className="flex min-h-screen flex-col justify-evenly items-center p-24">
      <div className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-400 to-red-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        ></div>
      </div>
      <TopNav />
      <h1 className="text-4xl font-semibold">Pictionary With Friends</h1>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-center ">Create or Join</CardTitle>
          <CardDescription>
            Create a room and invite friends, or join an open one!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {!session.userId && (
              <p className="text-center text-wrap mb-2">
                You need to be signed in to create or join a room!
              </p>
            )}
            <CreateRoom />
            <JoinRoom />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

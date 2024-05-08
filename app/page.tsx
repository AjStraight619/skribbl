import { auth } from "@/auth";
import Header from "@/components/landing-page/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Liveblocks } from "@liveblocks/node";

export default async function Home() {
  const session = await auth();

  const res = await fetch("http://localhost:3000/api/test", {
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    console.log("This is the data from the home page: ", data);
  }

  return (
    <main className="flex min-h-screen flex-col justify-evenly items-center p-24 bg-backgroundImage-canvas">
      <Header />
      <h1 className="text-3xl font-poppins">Pictionary With Friends</h1>
      {/* <div>{JSON.stringify(session, null, 2)}</div> */}
      {/* <div className="flex flex-col sm:flex-row gap-2 items-center">
        <CreateRoom />
        <Button className="">Join Room</Button>
      </div> */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="font-poppins text-center ">Play</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </main>
  );
}

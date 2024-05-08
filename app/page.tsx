import Header from "@/components/landing-page/header";
import TopNav from "@/components/landing-page/topnav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Liveblocks } from "@liveblocks/node";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/test", {
    cache: "no-store",
  });

  if (res.ok) {
    const data = await res.json();
    console.log("This is the data from the home page: ", data);
  }

  return (
    <main className="flex min-h-screen flex-col justify-evenly items-center p-24">
      <TopNav />

      {/* <Card className="bg-white">
        <CardHeader>
          <CardTitle className="font-poppins text-center ">Play</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card> */}
    </main>
  );
}

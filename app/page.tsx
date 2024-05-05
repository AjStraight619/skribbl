import { auth } from "@/auth";
import Logout from "@/components/auth/logout";
import CreateRoom from "@/components/landing-page/create-room";
import Header from "@/components/landing-page/header";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header />
      {/* <div>{JSON.stringify(session, null, 2)}</div> */}
      <div className="flex flex-col sm:flex-row gap-2">
        <CreateRoom />
      </div>
    </main>
  );
}

import { useSelf, useStorage } from "@/liveblocks.config";

export function useLeaderPerms() {
  const myId = useSelf((me) => me.id);
  const leader = useStorage((root) => root.players.find((p) => p.isLeader));

  return myId === leader?.id;
}

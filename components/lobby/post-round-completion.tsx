import {
  useOthersListener,
  useOthersMapped,
  useSelf,
} from "@/liveblocks.config";
import { useEffect, useMemo, useState } from "react";
import { Dialog } from "../ui/dialog";
import { useRound } from "@/hooks/useRound";

export default function PostRoundCompletion() {
  const { startNewRound } = useRound();

  const [allUsersHadTurn, setAllUsersHadTurn] = useState(false);
  const myTurnStatus = useSelf((me): [number, boolean] => {
    return [me.connectionId, me.presence.hasHadTurn];
  });

  const othersTurnStatus = useOthersMapped(
    (other) => other.presence.hasHadTurn
  );

  const allUsers = useMemo(
    () => [myTurnStatus, ...othersTurnStatus],
    [myTurnStatus, othersTurnStatus]
  );

  useEffect(() => {
    const allHadTurn = allUsers.every(([_, hasHadTurn]) => hasHadTurn);
    setAllUsersHadTurn(allHadTurn);
  }, [allUsers]);

  if (!allUsersHadTurn) return null;

  return <Dialog></Dialog>;
}

import { useRound } from "@/hooks/useRound";
import { useMutation, useStorage } from "@/liveblocks.config";
import { type Player as PlayerType } from "@/types/type";
import { CrownIcon, PencilIcon } from "lucide-react";
import { useEffect } from "react";

type PlayerProps = PlayerType;

export default function Player({ ...props }: PlayerProps) {
  const endOfTurn = useStorage((root) => root.round.timer === 0);

  return (
    <div className="flex flex-row items-center gap-x-2 w-full">
      <div className="w-6 mr-2 flex justify-center">
        {props.isLeader && <CrownIcon fill="yellow" />}
      </div>
      <div className="flex items-center gap-2 justify-start flex-grow">
        <p className="font-poppins">{props.username}</p>
        <span>{props.score}</span>
        <span>{props.isDrawing && <PencilIcon fill="orange" />}</span>
      </div>
    </div>
  );
}

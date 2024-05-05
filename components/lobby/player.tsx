import { type Player as PlayerType } from "@/types/type";
import { CrownIcon } from "lucide-react";

type PlayerProps = PlayerType;

export default function Player({ ...props }: PlayerProps) {
  return (
    <div className="flex flex-row items-center gap-x-2">
      {props.isLeader && <CrownIcon fill="yellow" />}
      <p className="font-poppins">{props.username}</p>
    </div>
  );
}

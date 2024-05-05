import { Room } from "@/components/room";
import { Live } from "@/components/index";

type RoomProps = {
    params: {
        roomId: string
    }
}

export default function Page({ params: { roomId } }: RoomProps) {
  return (
    <Room roomId={roomId}>
      <Live />
    </Room>
  );
}
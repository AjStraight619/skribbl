import { useOthersListener } from "@/liveblocks.config";

export default function PostRoundComplete() {
  useOthersListener(({ type, user, others }) => {});
}

import {
  useMutation,
  useOthers,
  useOthersMapped,
  useSelf,
} from "@/liveblocks.config";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/type";
import { nanoid } from "nanoid";

import Messages from "./messages";
import ChatInput from "./chat-input";

export default function Chat() {
  const [input, setInput] = useState("");

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);

  const myMessages = useSelf((me) => me.presence.messages);

  const othersMessages = useOthers((user) =>
    user.map((user) => user.presence.messages)
  ).flat();

  const othersMessagesMapped = useOthersMapped(
    (other) => other.presence.messages
  );

  const allMessages = [...myMessages, ...othersMessages].sort(
    (a, b) => a.timeStamp - b.timeStamp
  );

  const isCorrect = (lastUserMessage: string, currentWord: string) => {
    return lastUserMessage.toLowerCase() === currentWord.toLowerCase();
  };

  const isClose = (lastUserMessage: string, currentWord: string) => {
    let count = 0;
    currentWord.split("").forEach((char, idx) => {
      if (lastUserMessage[idx] === char) {
        count++;
      }
    });

    let incorrectCount = currentWord.length - count;

    return incorrectCount <= 2;
  };

  const calculateScore = (currentTime: number) => {
    return 1;
  };

  const sendMessage = useMutation(
    ({ setMyPresence, self, storage }, message: string) => {
      const currentWord = storage.get("round").get("currentWord");
      const player = storage
        .get("players")
        .find((player) => player.get("id") === self.id);

      const currentTime = storage.get("round").get("timer");

      const newUserMessage: Message = {
        id: nanoid(),
        userId: self.id,
        username: self.info.username,
        content: message,
        timeStamp: Date.now(),
        isCorrect: isCorrect(message, currentWord),
        isClose: isClose(message, currentWord),
      };
      setMyPresence({ messages: [...self.presence.messages, newUserMessage] });
      setInput("");
      // TODO: If user answers correct update player storage and the time in which they answered to calculate points accumulated
      // ? Use storage or presence if they guess word?
      // ! Presence implementation
      // TODO: Implement score calculations
      if (newUserMessage.isCorrect) {
        player?.set("score", player.get("score") + calculateScore(currentTime));
      }
    },

    []
  );

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <Card className="absolute transform -translate-y-1/4 top-1/4 right-4 min-h-[20rem] max-h-[30rem] flex flex-col select-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-poppins tracking-widest">
          Chat
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex flex-col flex-grow overflow-y-auto">
        <CardContent>
          <Messages messages={allMessages} />
          <div ref={bottomOfMessagesRef} />
        </CardContent>
      </ScrollArea>

      <CardFooter>
        <ChatInput
          onSendMessage={sendMessage}
          input={input}
          setInput={setInput}
        />
      </CardFooter>
    </Card>
  );
}

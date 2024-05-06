import {
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/type";
import { nanoid } from "nanoid";

export default function Chat() {
  const [input, setInput] = useState("");

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);

  const myMessages = useSelf((me) => me.presence.messages);

  const othersMessages = useOthersMapped((other) => other.presence.messages);

  //   const allMessages = [...myMessages.flat(), ...othersMessages.flat()];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log("input in keydown: ", input);
    if (e.key === "Enter" && input.length > 0) {
      // Checking if Enter key is pressed and input is not empty
      console.log("in key down");
      sendMessage(input);
      setInput(""); // Resetting the input after sending the message
    }
  };

  const isCorrect = (lastUserMessage: string, currentWord: string) => {
    return lastUserMessage === currentWord;
  };

  const isClose = (lastUserMessage: string, currentWord: string) => {
    let count = 0; // Count of correct characters in the correct position
    currentWord.split("").forEach((char, idx) => {
      if (lastUserMessage[idx] === char) {
        count++;
      }
    });

    let incorrectCount = currentWord.length - count;

    return incorrectCount <= 2;
  };

  const sendMessage = useMutation(
    ({ setMyPresence, self, storage }, message: string) => {
      const currentWord = storage.get("round").get("currentWord");

      console.log("message: ", message);
      const newUserMessage: Message = {
        id: nanoid(),
        userId: self.id,
        username: self.info.username,
        content: message,
        isCorrect: isCorrect(message, currentWord),
        isClose: isClose(message, currentWord),
      };
      setMyPresence({ messages: [...self.presence.messages, newUserMessage] });
      // TODO: If user answers correct update player storage and the time in which they answered to calculate points accumulated
    },
    []
  );

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [myMessages]);

  return (
    <Card className="absolute transform -translate-y-1/4 top-1/4 right-4 min-h-[20rem] max-h-[30rem] flex flex-col select-none shadow-lg">
      <CardHeader>
        <CardTitle className="text-center font-poppins tracking-widest">
          Chat
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex flex-col flex-grow overflow-y-auto">
        <CardContent>
          {myMessages && (
            <ul className="text-sm flex flex-col gap-2 mt-auto">
              {myMessages.map((msg, idx) => (
                <li
                  className={`${msg.isCorrect ? "text-green-500" : ""} ${
                    msg.isClose ? "text-yellow-500" : ""
                  } flex flex-row items-center gap-x-1`}
                  key={msg.id}
                >
                  <span className="font-poppins">{msg.username}: </span>
                  <span className="font-light">{msg.content}</span>

                  {msg.isClose && <span> is close!!</span>}
                  {msg.isCorrect && <span> is correct!!</span>}
                </li>
              ))}
            </ul>
          )}
          <div ref={bottomOfMessagesRef} />
        </CardContent>
      </ScrollArea>

      <CardFooter>
        <Input
          onKeyDown={handleKeyDown}
          placeholder="Guess the word!"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </CardFooter>
    </Card>
  );
}

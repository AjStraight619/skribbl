import { Message } from "@/types/type";
import React from "react";

type MessagesProps = {
  messages: Message[];
};

type CurrentGuessProps = {
  message: Message;
};

const Messages = React.memo(({ messages }: MessagesProps) => {
  return (
    <ul>
      {messages.map((msg, idx) => (
        <li key={idx}>
          <span className="font-poppins">{msg.username}: </span>
          <CurrentGuess message={msg} />
        </li>
      ))}
    </ul>
  );
});

const CurrentGuess = React.memo(({ message }: CurrentGuessProps) => {
  if (message.isCorrect) {
    return <span className="text-green-500"> that is correct!!</span>;
  } else if (message.isClose) {
    return <span className="text-yellow-500"> is close!!</span>;
  } else {
    return <span>{message.content}</span>;
  }
});

CurrentGuess.displayName = "CurrentGuess";

Messages.displayName = "Messages";

export default Messages;

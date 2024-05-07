import React from "react";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatInputProps = {
  input: string;
  setInput: (input: string) => void;
  onSendMessage: (input: string) => void;
};

const ChatInput = React.memo(
  ({ input, setInput, onSendMessage }: ChatInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && input.length > 0) {
        onSendMessage(input);
      }
    };

    return (
      <div className="relative">
        <Input
          onKeyDown={handleKeyDown}
          placeholder="Guess the word!"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button
          onClick={() => onSendMessage(input)}
          className="absolute right-1 transform -translate-y-1/2 top-1/2"
          size="sm"
          variant="ghost"
        >
          <SendIcon size={20} />
        </Button>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;

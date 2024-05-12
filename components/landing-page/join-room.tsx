"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { nanoid } from "nanoid";

import { z } from "zod";
import { Input } from "../ui/input";
import { useAuth } from "@clerk/nextjs";
import MyToolTip from "../ui/my-tooltip";
import SubmitButton from "../ui/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { usePathname } from "next/navigation";

type JoinRoomProps = {
  openRooms: OpenRoom[];
};

type OpenRoom = {
  id: string;
  name: string;
  numPlayers: number;
};

const testData = [
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
  {
    name: "room",
    numPlayers: 4,
  },
];

export default function JoinRoom({ openRooms }: JoinRoomProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [input, setInput] = useState("");
  const pathname = usePathname();
  const form = useForm();
  const { isSignedIn } = useAuth();

  // TODO: Handle backend logic for joining a room
  const onSubmit = () => {};

  const isValidLink = useDebouncedCallback((input: string) => {
    const parts = input.split("/");
  }, 3000);

  const handleInputChange = (input: string) => {
    setInput(input);
    isValidLink(input);
  };

  const handleRoomSelection = (roomId: string) => {
    setInput(`${pathname}/room/${roomId}`);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!isSignedIn}
          className="w-full disabled:cursor-not-allowed"
        >
          Join room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="roomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton className="w-full">Join Room</SubmitButton>
          </form>
        </Form>
        <Card className="">
          <CardHeader>
            <CardTitle className="text-center">Open Rooms</CardTitle>
          </CardHeader>
          <ScrollArea>
            <CardContent className="max-h-[20rem]">
              <ul className="flex flex-col gap-y-1">
                {testData.map((item, idx) => (
                  <li
                    tabIndex={0}
                    className="flex items-center justify-between hover:bg-secondary p-2 rounded-lg"
                    key={idx}
                  >
                    <span>{item.name}</span>
                    <span>{item.numPlayers} / 8</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </ScrollArea>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

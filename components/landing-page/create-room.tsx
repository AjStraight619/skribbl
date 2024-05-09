"use client";
import { useState, useTransition } from "react";
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
import SubmitButton from "../ui/submit-button";
import { createRoom } from "@/actions/room";
import { useAuth } from "@clerk/nextjs";
import MyToolTip from "../ui/my-tooltip";

export default function CreateRoom() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { isSignedIn } = useAuth();

  console.log("isSignedIn?: ", isSignedIn);

  const form = useForm({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      displayName: "",
      roomName: "",
      numPlayers: 5,
      openRoom: false,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    startTransition(() => {
      createRoom(values).then();
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button disabled={!isSignedIn} className="w-full">
          Create Room
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="JohnDoe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton className="w-full">Create Room</SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

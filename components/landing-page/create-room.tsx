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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const { isSignedIn } = useAuth();

  console.log("isSignedIn?: ", isSignedIn);

  const form = useForm({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: {
      roomName: "",
      numPlayers: 5,
      openRoom: "no" as "no" | "yes",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateRoomSchema>) => {
    startTransition(() => {
      createRoom(values).then((data) => {
        console.log("data: ", data);
        if (typeof data.success !== null && data.success) {
          push(`/room/${data.success.roomId}`);
        }
      });
      console.log(values);
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="My room" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openRoom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Availability:{" "}
                      <span className="text-muted-foreground">
                        Allow this room to be joinable without an invitation
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            field.onChange(value as "yes" | "no");
                          }}
                        >
                          <SelectTrigger id="open">
                            <SelectValue placeholder="Allow this room to be open?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton isPending={isPending} className="w-full">
              Create Room
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

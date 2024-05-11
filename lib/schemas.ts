import { z } from "zod";

export const CreateRoomSchema = z.object({
  roomName: z
    .string()
    .min(3, {
      message: "Room name must be at least 3 characters.",
    })
    .max(15, {
      message: "Room name cannot exceed 15 characters.",
    }),
  numPlayers: z
    .number()
    .min(2, {
      message: "Two players minimum",
    })
    .max(8, {
      message: "Eight players maximum",
    })
    .default(5),
  openRoom: z.enum(["yes", "no"], {
    required_error: "You must specify room availability.",
  }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email().min(3).max(50),
    username: z
      .string()
      .min(3, {
        message: "Username too short",
      })
      .max(12, {
        message: "Username too long. Maximum of 12 charaxcters",
      }),
    password: z.string().min(8, {
      message: "Password too short",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const GameSchema = z.object({
  numPlayers: z
    .string()
    .min(1, {
      message: "Minimum of 1 player",
    })
    .max(8, {
      message: "Maximum of 8 players",
    }),
});

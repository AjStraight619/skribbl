"use server";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
    };
  }

  const { email, password, name, username } = validatedValues.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      user: existingUser,
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      email,
      displayName: name,
      password: hashedPassword,
      userName: username,
    },
  });

  return {
    success: "Account Created",
  };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
    };
  }
  const { email, password } = validatedValues.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: getErrorMessage(error),
          };
        default:
          return {
            error: getErrorMessage(error),
          };
      }
    }
    console.error(JSON.stringify(error, null, 2));
    return {
      error: "Something went wrong",
    };
  }

  redirect("/");
};

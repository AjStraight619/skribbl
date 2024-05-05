"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import SubmitButton from "@/components/ui/submit-button";
import { login, register } from "@/actions/auth";
// import Socials from "./socials";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { ErrorMessage, SuccessMessage } from "@/components/auth/auth-messages";
import { z } from "zod";
import { Button } from "../ui/button";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form submit handler

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
      });
    });
  };

  return (
    <Card className="w-full sm:max-w-[24rem]">
      <CardHeader className="text-center space-y-4">
        <CardTitle>Scribblio Clone</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="*******" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton
              disabled={isPending}
              isPending={isPending}
              className="w-full"
            >
              Login
            </SubmitButton>
          </form>
        </Form>
        <Button
          type="button"
          className="w-full mt-2"
          variant="secondary"
          asChild
        >
          <Link href="/">Continue as guest</Link>
        </Button>
        <div className="mt-2">
          <ErrorMessage errorMessage={error} />
        </div>
        <div className="flex flex-row items-center justify-center overflow-hidden gap-2 mt-6">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        {/* <Socials /> */}
        <div className="w-full text-center mt-6">
          <Link
            className="text-sm hover:underline hover:opacity-100 opacity-30 transition-opacity duration-100"
            href="/register"
          >
            Dont have an account?
          </Link>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default LoginForm;

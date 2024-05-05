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
import { RegisterSchema } from "@/lib/schemas";
import SubmitButton from "@/components/ui/submit-button";
import { register } from "@/actions/auth";
// import Socials from "./socials";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { ErrorMessage, SuccessMessage } from "@/components/auth/auth-messages";
import { z } from "zod";
import { Button } from "../ui/button";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Register form submit handler

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .then(() => {
          if (success) push("/");
        });
    });
  };

  console.log("error: ", error);

  return (
    <Card className="w-full sm:max-w-[24rem]">
      <CardHeader className="text-center space-y-4">
        <CardTitle>Scribblio Clone</CardTitle>
        {/* <CardDescription>Learn math in a new way with ai.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Kingjames23" type="text" />
                    </FormControl>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              Register
            </SubmitButton>
            <ErrorMessage errorMessage={error} />
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
        <div className="flex flex-row items-center justify-center overflow-hidden gap-2 mt-6">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        {/* <Socials /> */}
        <div className="w-full text-center mt-6">
          <Link
            className="text-sm hover:underline hover:opacity-100 opacity-30 transition-opacity duration-100"
            href="/login"
          >
            Already have an account?
          </Link>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default RegisterForm;

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/actions/user";
import { LoginSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          console.log("Successfully parsed credentials");
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          console.log(user);
          if (!user || user.password === null) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("Password match?: ", passwordsMatch);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});

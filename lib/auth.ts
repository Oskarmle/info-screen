import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
export const { auth, handlers, signIn } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
});

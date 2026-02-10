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
        name: {},
      },
      authorize: async (credentials) => {
        // mock data for testing
        const email = "admin@admin.com";
        const password = "password";
        const name = "admin";

        if (credentials.email === email && credentials.password === password) {
          return { email, password, name };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/api";
import { AxiosError } from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo electrónico",
          type: "email",
          placeholder: "Correo electrónico",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const newCredentials = {
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          };

          const res = await api.post("/login", newCredentials);
          const user = res.data;

          return user;
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            const errorMessage = error.response.data.message;

            if (error.response.status === 401) {
              return null;
            }
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;

      return session;
    },
  },
};

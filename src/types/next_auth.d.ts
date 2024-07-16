import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      user: {
        id: string;
        username: string;
        email: string;
      };
    };
  }
}

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "@auth/core/providers/github";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (auth?.user?.email) {
        if (nextUrl.pathname.startsWith("/login")) {
          return Response.redirect(new URL("/proof", nextUrl));
        }
      } else {
        if (
          nextUrl.pathname.startsWith("/products") ||
          nextUrl.pathname.startsWith("/cart") ||
          nextUrl.pathname.startsWith("/account") ||
          nextUrl.pathname.startsWith("/proof") ||
          nextUrl.pathname.startsWith("/game") ||
          nextUrl.pathname.startsWith("/products/create")
        ) {
          return Response.redirect(new URL("/login", nextUrl));
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
  },
});

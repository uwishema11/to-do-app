// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import NextAuth,{NextAuthConfig} from "next-auth";
// import github from "next-auth/providers/github";
// import { db } from "./db";
// import nextAuth from "next-auth";

// export const authConfig = {
//     providers: [github],
//     adapters: DrizzleAdapter(db),
// }

// export const {handlers, auth, signOut} = nextAuth(authConfig)

// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import type { Provider } from "next-auth/providers";
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { db } from "./db";

// const providers: Provider[] = [GitHub];
// export const providerMap = providers.map((provider) => {
//   if (typeof provider === "function") {
//     const providerData = provider();
//     return { id: providerData.id, name: providerData.name };
//   } else {
//     return { id: provider.id, name: provider.name };
//   }
// });
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: DrizzleAdapter(db),
//   providers,
//   pages: {
//     signIn: "/signin",
//   },
// });


import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import { db } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter : DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  },
);

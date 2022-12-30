import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

import { CustomSession } from "../../../client/auth/useSession";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/prisma";

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const siwe = new SiweMessage(JSON.parse(credentials.message));

          const url = env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`;
          const domain = new URL(url).host;
          if (siwe.domain !== domain) return null;

          const nonce = await getCsrfToken({ req });
          if (siwe.nonce !== nonce) return null;

          const result = await siwe.verify({ signature: credentials.signature, domain, nonce });
          if (!result.success) return null;

          return { id: siwe.address };
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  return {
    callbacks: {
      session({ session, token }: { session: CustomSession; token: any }) {
        session.address = token.sub;
        session.user = { name: token.sub };
        return session;
      },
    },

    providers,
    adapter: PrismaAdapter(prisma),
    secret: env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  return await NextAuth(req, res, authOptions);
}

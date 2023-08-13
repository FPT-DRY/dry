import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from "bcryptjs";
import NextAuth, { AuthOptions } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  pages: {
    /* override signIn, signOut, error page urls here... */
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    /* define callback options here */
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password'
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          }
        })

        if (!user || !user.password || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image
        }

      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = getToken({ req, cookieName: 'dry-jwt-auth' });
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };

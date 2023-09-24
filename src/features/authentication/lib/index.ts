import { AUTH_ERROR } from '@features/authentication/constants';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare, genSaltSync } from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '../../../lib/prisma';

export const passwordSalt = genSaltSync(7);

const authOptions: AuthOptions = {
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    /* define callback options here */
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw { name: 'AuthError', message: AUTH_ERROR.MISSING_AUTH_PARAMS };
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (
          !user ||
          !user.password ||
          !(await compare(credentials.password, user.password))
        ) {
          throw {
            name: 'AuthError',
            message: AUTH_ERROR.CREDENTIALS_MISMATCH,
          };
        }

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        };
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

export default authOptions;

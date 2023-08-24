import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import authOptions from '@lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const _token = getToken({ req, cookieName: 'dry-jwt-auth' });
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };

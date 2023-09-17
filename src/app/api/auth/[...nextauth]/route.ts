import authOptions from '@lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type CustomNextRequest = NextApiRequest & NextRequest;
type CustomNextResponse = NextApiResponse & NextResponse;

const handler = async (req: CustomNextRequest, res: CustomNextResponse) => {
  const _token = getToken({ req, cookieName: 'dry-jwt-auth' });
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };


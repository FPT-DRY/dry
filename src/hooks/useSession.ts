import { fetcher } from '@lib/fetch';
import prisma from '@lib/prisma';
import useSWR from 'swr';

type SessionData = {
  user: any;
  expires: string;
}

export default function useSession() {
  const { data: session } = useSWR<SessionData, any>('/api/auth/session', fetcher('get').init);

  return session;
}
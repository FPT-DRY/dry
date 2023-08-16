import { fetcher } from '@lib/fetch';
import useSWR from 'swr';

type SessionData = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}

export default function useSession() {
  const { data: session } = useSWR<SessionData, any>('/api/auth/session', fetcher('get').init);

  return session;
}
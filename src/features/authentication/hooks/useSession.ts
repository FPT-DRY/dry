import { http } from '@lib/http';
import useSWR from 'swr';

type SessionData = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
};

export default function useSession() {
  let { data: session } = useSWR<SessionData, any>(
    '/api/auth/session',
    http('GET')
  );

  return session;
}

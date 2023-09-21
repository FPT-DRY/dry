import { http } from '@lib/http';
import { useEffect } from 'react';
import useSWR from 'swr';
import { SESSION_KEY } from '~/constants/keys';

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

  useEffect(() => {
    if (!session) {
      const storedSession = sessionStorage.getItem(SESSION_KEY);
      session =
        storedSession !== null
          ? (JSON.parse(storedSession) as SessionData)
          : undefined;

      if (session) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  return session;
}

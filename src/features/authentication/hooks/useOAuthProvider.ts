import { http } from '@lib/http';
import useSWR from 'swr';

export type ProviderData = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

export default function useOAuth2Provider() {
  const { data: providers } = useSWR<
    {
      [provider: string]: ProviderData;
    },
    any
  >('/api/auth/providers', http('GET'));

  if (providers === undefined) {
    return providers;
  }

  Object.entries(providers).forEach(([name, info]) => {
    if (info.type !== 'oauth') {
      delete providers[name];
    }
  });

  return providers;
}

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

type Props = {
  redirectTo: string;
  seconds?: number;
};

export default function useRedirectAfterTime({
  redirectTo,
  seconds = 5,
}: Props) {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);

  useLayoutEffect(() => {
    if (secondsRemaining <= 1) {
      router.push(redirectTo);
    }

    const timer: NodeJS.Timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [secondsRemaining]);

  return secondsRemaining;
}

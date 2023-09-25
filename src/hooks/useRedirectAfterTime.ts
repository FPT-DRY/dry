import { redirect } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

type Props = {
  redirectTo: string;
  seconds?: number;
};

export default function useRedirectAfterTime({
  redirectTo,
  seconds = 5,
}: Props) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);

  useLayoutEffect(() => {
    if (secondsRemaining <= 1) {
      redirect(redirectTo);
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsRemaining, redirectTo]);

  return secondsRemaining;
}

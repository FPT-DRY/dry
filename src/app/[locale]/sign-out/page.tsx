'use client';

import useSession from '@features/authentication/hooks/useSession';
import useRedirectAfterTime from '@hooks/useRedirectAfterTime';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

type Props = {};

function SignOut({}: Props) {
  const session = useSession();
  const translate = useTranslations('pages.auth.signOut');
  const seconds = useRedirectAfterTime({ redirectTo: '/' });

  if (!session?.user) {
    redirect('/');
  } else if (seconds === 0) {
    signOut({ redirect: false });
  }

  return (
    <div className='w-screen h-screen relative'>
      <div className='absolute-center text-center text-white'>
        <h3 className='text-xl'>{translate('alert.line1')}</h3>
        <p color='text-lg'>
          {translate('alert.line2', { seconds })}
          {seconds > 1 ? 's' : ''}
          ...
        </p>
      </div>
    </div>
  );
}

export default SignOut;

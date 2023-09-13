'use client';

import useRedirectAfterTime from '@hooks/useRedirectAfterTime';
import useSession from '@hooks/useSession';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

type Props = {};

function SignOut({}: Props) {
  const session = useSession();
  const translate = useTranslations('pages.signOut');
  const seconds = useRedirectAfterTime({ redirectTo: '/' });

  if (session?.user) {
    signOut({ redirect: false });
  } else {
    redirect('/');
  }

  return (
    <div className='w-screen h-screen bg-teal-100 relative'>
      <div className='absolute-center'>
        <h3>{translate('alert.line1')}</h3>
        <p>
          {translate('alert.line2', { seconds })}
          {seconds > 1 ? 's' : ''}
          ...
        </p>
      </div>
    </div>
  );
}

export default SignOut;

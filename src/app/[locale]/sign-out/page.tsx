'use client';

import useRedirectAfterTime from '@hooks/useRedirectAfterTime';
import useSession from '@hooks/useSession';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';


type Props = {};

function SignOut({}: Props) {
  const session = useSession();
  const seconds = useRedirectAfterTime({ redirectTo: '/' });

  if (session?.user) {
    signOut({ redirect: false });
  } else {
    redirect('/');
  }

  return (
    <div className='w-screen h-screen bg-teal-100 relative'>
      <div className='absolute-center'>
        <h3>You have logged out from current session.</h3>
        <p>
          Redirecting to homepage after {seconds} second
          {seconds > 1 ? 's' : ''}
          ...
        </p>
      </div>
    </div>
  );
}

export default SignOut;

'use client';

import useRedirectAfterTime from '@hooks/useRedirectAfterTime';
import React from 'react';

type Props = {};

function SignOut({}: Props) {
  const seconds = useRedirectAfterTime({ redirectTo: '/' });

  return (
    <div className='w-screen h-screen bg-teal-100 relative'>
      <div className='absolute-center'>
        <h3>You have logged out from current session.</h3>
        <p>
          Redirecting to homepage after {seconds} second{seconds > 1 ? 's' : ''}
          ...
        </p>
      </div>
    </div>
  );
}

export default SignOut;
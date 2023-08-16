'use client';

import useRedirectAfterTime from '@hooks/useRedirectAfterTime';
import React from 'react';

type Props = {};

function SignOut({}: Props) {
  const seconds = useRedirectAfterTime({ redirectTo: '/' });

  return (
    <div className='m-auto'>
      You have logged out from current session. 
      Redirecting to homepage after {seconds} second{seconds > 1 ? 's' :''}...
    </div>
  );
}

export default SignOut;

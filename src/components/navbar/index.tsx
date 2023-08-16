'use client';

import Button from '@components/elements/Button';
import { signIn, signOut } from 'next-auth/react';
import useSession from '@hooks/useSession';

type Props = {};

function NavBar({}: Props) {
  const session = useSession();

  return (
    <div>
      {session && (
        <>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </>
      )}
      <Button variant='success' onClick={() => signIn()}>
        Sign In
      </Button>
      <Button variant='danger' onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
}

export default NavBar;

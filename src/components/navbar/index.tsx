'use client';

import Button from '@components/elements/Button';
import { signIn, signOut } from 'next-auth/react';
import useSession from '@hooks/useSession';


type Props = {};

function NavBar({}: Props) {
  const session = useSession();

  console.log(session);

  return (
    <div>
      {session && <p>{session.user.name}</p>}
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

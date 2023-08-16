'use client';

import Button from '@components/elements/Button';
import useSession from '@hooks/useSession';
import { isEmpty } from 'lodash';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';

import styles from './navbar.module.scss';

const cx = classNames.bind(styles);

type Props = {};

function NavBar({}: Props) {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className={cx('root')}>
      <div className={cx('auth-container')}>
        {isEmpty(session) ? (
          <Button variant='success' onClick={() => signIn()}>
            Sign In
          </Button>
        ) : (
          <>
            <p>{session?.user?.name}</p>
            <Button
              variant='danger'
              onClick={async () => {
                const data = await signOut({
                  redirect: false,
                  callbackUrl: '/sign-out',
                });
                router.push(data.url);
              }}
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

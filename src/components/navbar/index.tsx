'use client';

import Button from '@components/elements/Button';
import useSession from '@hooks/useSession';
import { isEmpty } from 'lodash';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import Image from 'next/image';

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
          <div className={cx('flex justify-center items-center gap-4')}>
            <label htmlFor='nickname'>{session?.user?.name}</label>
            <Image
              className='rounded-full border border-gray-700'
              src={session?.user?.image}
              alt='user-avatar'
              width={40}
              height={40}
            />
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
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

'use client';

import Button from '@components/elements/Button';
import Menu from '@components/elements/Menu';
import useSession from '@hooks/useSession';
import classNames from 'classnames/bind';
import { capitalize, isEmpty } from 'lodash';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';

import styles from './navbar.module.scss';
import UserInfo from './UserInfo';
import Divider from '@components/elements/Divider';

const cx = classNames.bind(styles);

type Props = {};

function NavBar({}: Props) {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className={cx('root')}>
      <Link className={cx('logo')} href='/'></Link>
      <div className={cx('auth-container')}>
        <div className={cx('flex justify-center items-center gap-4')}>
          {isEmpty(session) ? (
            <Button variant='success' onClick={() => signIn()}>
              <FaUser size={18} />
              <span>Sign In</span>
            </Button>
          ) : (
            <>
              <Menu
                // hover
                position='right'
                items={[
                  <UserInfo
                    key='user-info'
                    username={capitalize(session.user.name)}
                    email={session.user.email}
                    tooltipPosition='left'
                  />,
                  <Divider key='divider-01'/>,
                  <Button
                    fullScreen
                    key={'sign-out'}
                    variant='danger'
                    onClick={async () => {
                      const data = await signOut({
                        redirect: false,
                        callbackUrl: '/sign-out',
                      });
                      router.push(data.url);
                    }}
                  >
                    <IoLogOut size={20} />
                    <span>Sign Out</span>
                  </Button>,
                ]}
              >
                <Image
                  className='rounded-full border border-gray-700'
                  src={session?.user?.image}
                  alt='user-avatar'
                  width={40}
                  height={40}
                />
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

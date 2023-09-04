'use client';

import Button from '@components/elements/Button';
import FormControl from '@components/elements/FormControl';
import OAuthProvider from '@components/providers/oauth';
import classNames from 'classnames/bind';

import styles from './SignIn.module.scss';
import useSession from '@hooks/useSession';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const cx = classNames.bind(styles);

type Props = {};

function SignIn({}: Props) {
  const session = useSession();

  useEffect(() => {
    if (session?.user) {
      redirect('/');
    }
  }, [session]);

  return (
    <div className={cx('root')}>
      <div className={cx('container', 'absolute-center')}>
        <div className={cx('card', 'sign-in-card')}>
          <FormControl
            variant='outline'
            inputName='username'
            labelText='Username'
            placeholder='Enter your username'
            autoComplete='off'
          />
          <FormControl
            variant='outline'
            inputName='password'
            labelText='Password'
            inputType='password'
            placeholder='Enter your password'
          />
          <Button
            fullSize
            className={cx('sign-in-btn', 'mt-[15px]', 'px-[10px]', 'py-[15px]')}
          >
            Login
          </Button>
          <hr className={cx('divider')} />
          <OAuthProvider provider='github' className={'px-[10px] py-[15px]'} />
          <OAuthProvider provider='google' className={'px-[10px] py-[15px]'} />
        </div>
      </div>
    </div>
  );
}

export default SignIn;

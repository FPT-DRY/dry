'use client';

import Button from '@components/elements/Button';
import FormControl from '@components/elements/FormControl';
import OAuthProvider from '@components/providers/oauth';
import { yupResolver } from '@hookform/resolvers/yup';
import useSession from '@hooks/useSession';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

type FormData = {
  username: string;
  password: string;
};

function SignIn() {
  const session = useSession();
  const translate = useTranslations();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(
      yup
        .object<FormData>()
        .shape({
          username: yup
            .string()
            .min(6, translate('messages.username.min', { length: 6 }))
            .max(50, translate('messages.username.max', { length: 50 }))
            .matches(
              /^[a-z0-9]{6,50}$/i,
              translate('messages.username.pattern')
            )
            .required(translate('messages.username.required')),
          password: yup
            .string()
            .min(6, translate('messages.password.min', { length: 6 }))
            .required(translate('messages.password.required')),
        })
        .required()
    ),
  });

  useEffect(() => {
    if (session?.user) {
      redirect('/');
    }
  }, [session]);

  const onSubmitLoginHandler = async (data: FormData, evt: any) => {
    const response = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });    
    if (response?.error) {
      console.error(response.error);
      return;
    }
  };

  return (
    <div className={cx('root')}>
      <div className={cx('container', 'absolute-center')}>
        <form className={cx('card', 'sign-in-card')} onSubmit={handleSubmit(onSubmitLoginHandler)}>
          <FormControl
            variant='outline'
            name='username'
            labelText='Username'
            placeholder='Enter your username'
            autoComplete='off'
            control={control}
            error={errors.username}
          />
          <FormControl
            variant='outline'
            name='password'
            labelText='Password'
            type='password'
            placeholder='Enter your password'
            control={control}
            error={errors.password}
          />
          <Button
            fullSize
            type='submit'
            className={cx('sign-in-btn', 'mt-[15px]', 'px-[10px]', 'py-[15px]')}
            disabled={!isDirty || !isEmpty(errors)}
          >
            Login
          </Button>
          <hr className={cx('divider')} />
          <OAuthProvider provider='github' className={'px-[10px] py-[15px]'} />
          <OAuthProvider provider='google' className={'px-[10px] py-[15px]'} />
        </form>
      </div>
    </div>
  );
}

export default SignIn;

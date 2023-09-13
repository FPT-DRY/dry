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
import Link from 'next/link';
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
  const messages = useTranslations('messages.validation');
  const translate = useTranslations('pages.signIn');

  const validationSchema = yup
    .object<FormData>()
    .shape({
      username: yup
        .string()
        .min(6, messages('username.min', { length: 6 }))
        .max(50, messages('username.max', { length: 50 }))
        .matches(/^[a-z0-9._]{6,50}$/i, messages('username.pattern'))
        .required(messages('username.required')),
      password: yup
        .string()
        .min(6, messages('password.min', { length: 6 }))
        .required(messages('password.required')),
    })
    .required();

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
    resolver: yupResolver(validationSchema),
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
        <form
          className={cx('card', 'sign-in-card')}
          onSubmit={handleSubmit(onSubmitLoginHandler)}
        >
          <FormControl
            variant='outline'
            name='username'
            labelText={translate('usernameLabel')}
            placeholder={translate('usernamePlaceholder')}
            autoComplete='off'
            control={control}
            error={errors.username}
          />
          <FormControl
            variant='outline'
            name='password'
            labelText={translate('passwordLabel')}
            type='password'
            placeholder={translate('passwordPlaceholder')}
            control={control}
            error={errors.password}
          />
          <Button
            fullSize
            type='submit'
            className={cx('sign-in-btn', 'mt-[15px]', 'px-[10px]', 'py-[15px]')}
            disabled={!isDirty || !isEmpty(errors)}
          >
            {translate('loginBtn')}
          </Button>
          <div className='flex mt-5'>
            <Link className={cx('link', 'mr-auto')} href='/sign-up'>
              {translate('createAccountLink')}
            </Link>
            <Link className={cx('link', 'ml-auto')} href='/forget-password'>
              {translate('forgetPasswordLink')}
            </Link>
          </div>
          <hr className={cx('divider')} />
          <OAuthProvider provider='github' className={'px-[10px] py-[15px]'} />
          <OAuthProvider provider='google' className={'px-[10px] py-[15px]'} />
        </form>
      </div>
    </div>
  );
}

export default SignIn;

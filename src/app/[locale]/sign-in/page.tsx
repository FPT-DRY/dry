'use client';

import Button from '@components/elements/Button';
import Form from '@components/elements/Form';
import FormControl from '@components/elements/FormControl';
import OAuthSignIn from '@features/authentication/components/oauth';
import { AUTH_ERROR } from '@features/authentication/constants';
import useSession from '@features/authentication/hooks/useSession';
import AuthLayout from '@features/authentication/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { entries, isEmpty } from 'lodash';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

type FormData = {
  username: string;
  password: string;
};

function SignIn() {
  const session = useSession();
  const router = useRouter();
  const messages = useTranslations('messages.validation');
  const translate = useTranslations('pages.auth');

  const defaultValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup
    .object<FormData>()
    .shape({
      username: yup
        .string()
        .matches(/^[a-z0-9._]{6,50}$/i, messages('username.pattern'))
        .min(6, messages('username.min', { length: 6 }))
        .max(50, messages('username.max', { length: 50 }))
        .required(messages('username.required')),
      password: yup
        .string()
        .min(6, messages('password.min', { length: 6 }))
        .required(messages('password.required')),
    })
    .required();

  useEffect(() => {
    if (session?.user) {
      redirect('/');
    }
  }, [session]);

  return (
    <AuthLayout>
      <Form<FormData>
        className={cx('card')}
        defaultValues={defaultValues}
        resolver={yupResolver(validationSchema)}
      >
        {({ formState: { errors, dirtyFields }, reset, handleSubmit }) => {
          const isDirtyAll =
            entries(dirtyFields).length === entries(defaultValues).length;
          const isDisabled = !isDirtyAll || !isEmpty(errors);

          const onSubmitLoginHandler = async (data: FormData, evt: any) => {
            const response = await signIn('credentials', {
              redirect: false,
              username: data.username,
              password: data.password,
              callbackUrl: '/',
            });

            if (!response?.ok) {
              // TODO: handle for this case
            }

            if (response?.error) {
              router.push(`?${new URLSearchParams({ error: response.error })}`);
              switch (response.error) {
                case AUTH_ERROR.MISSING_AUTH_PARAMS:
                  toast.error(translate('signIn.messages.missingParamsError'));
                  reset();
                  break;
                case AUTH_ERROR.CREDENTIALS_MISMATCH:
                  toast.error(
                    translate('signIn.messages.credentialsMismatchError')
                  );
                  reset();
                  break;
                default:
                  toast.error('UNKNOWN ERROR!');
                  reset();
                  break;
              }
            } else {
              router.replace('/');
            }
          };

          return (
            <>
              <FormControl
                variant='outline'
                name='username'
                labelText={translate('form.usernameLabel')}
                placeholder={translate('form.usernamePlaceholder')}
              />
              <FormControl
                variant='outline'
                name='password'
                labelText={translate('form.passwordLabel')}
                type='password'
                placeholder={translate('form.passwordPlaceholder')}
              />
              <Button
                fullSize
                type='submit'
                className={cx(
                  'sign-in-btn',
                  'mt-[15px]',
                  'px-[10px]',
                  'py-[15px]'
                )}
                disabled={isDisabled}
                onClick={handleSubmit(onSubmitLoginHandler)}
                onKeyUp={(evt) => {
                  if (evt.key === 'Enter' && !isDisabled) {
                    handleSubmit(onSubmitLoginHandler);
                  }
                }}
              >
                {translate('signIn.loginBtn')}
              </Button>

              <div className='flex mt-5'>
                <Link className={cx('link', 'mr-auto')} href='sign-up'>
                  {translate('signIn.createAccountLink')}
                </Link>
                <Link className={cx('link', 'ml-auto')} href='forget-password'>
                  {translate('signIn.forgetPasswordLink')}
                </Link>
              </div>
              <hr className={cx('divider')} />
              <OAuthSignIn
                provider='github'
                className={'px-[10px] py-[15px]'}
              />
              <OAuthSignIn
                provider='google'
                className={'px-[10px] py-[15px]'}
              />
            </>
          );
        }}
      </Form>
    </AuthLayout>
  );
}

export default SignIn;

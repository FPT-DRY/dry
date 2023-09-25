'use client';

import Button from '@components/elements/Button';
import Form from '@components/elements/Form';
import FormControl from '@components/elements/FormControl';
import AuthLayout from '@features/authentication/layout';
import {
  UserResponse,
  UserUpsertRequest,
} from '@features/authentication/model/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApi } from '@hooks/useApi';
import classNames from 'classnames/bind';
import { entries, isEmpty } from 'lodash';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

import styles from './SignUp.module.scss';

const cx = classNames.bind(styles);

type FormData = {
  username: string;
  password: string;
  'confirm-password'?: string;
  'first-name': string;
  'last-name': string;
  email: string;
};

function SignUp() {
  const router = useRouter();
  const translate = useTranslations('pages.auth');
  const messages = useTranslations('messages.validation');
  const { loading, error, POST } = useApi<UserResponse>();

  const defaultValues: FormData = {
    username: '',
    password: '',
    'confirm-password': '',
    'first-name': '',
    'last-name': '',
    email: '',
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
      'confirm-password': yup
        .string()
        .oneOf([yup.ref('password')], messages('confirm-password.mismatch')),
      'first-name': yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, messages('name.pattern'))
        .required(messages('name.required.first')),
      'last-name': yup
        .string()
        .matches(/^[a-zA-Z\s]+$/, messages('name.pattern'))
        .required(messages('name.required.last')),
      email: yup
        .string()
        .matches(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          messages('email.pattern')
        )
        .required(messages('email.required')),
    })
    .required();

  return (
    <AuthLayout>
      <Form<FormData>
        className={cx('card')}
        defaultValues={defaultValues}
        resolver={yupResolver(validationSchema)}
      >
        {({ formState: { errors, dirtyFields }, handleSubmit }) => {
          const isDirtyAll =
            entries(dirtyFields).length === entries(defaultValues).length;
          const isDisabled = !isDirtyAll || !isEmpty(errors);

          const onSubmitCreateUserHandlder = async (
            formData: FormData,
            evt: any
          ) => {
            const requestBody: UserUpsertRequest = {
              username: formData.username,
              password: formData.password,
              name: `${formData['first-name']} ${formData['last-name']}`,
              email: formData.email,
            };
            const { status } = await POST({
              url: '/api/users',
              data: requestBody,
            });

            if (status?.code === 201) {
              router.replace('registered');
            }
          };

          return (
            <>
              <h1 className='text-white'>{error?.name}</h1>
              <h2 className={cx('title')}>
                {translate('signUp.createAccount')}
              </h2>
              <FormControl
                labelText={translate('form.usernameLabel')}
                name='username'
                placeholder={translate('form.usernamePlaceholder')}
                autoComplete='off'
              />
              <FormControl
                labelText={translate('form.passwordLabel')}
                name='password'
                type='password'
                placeholder={translate('form.passwordPlaceholder')}
              />
              <FormControl
                labelText={translate('form.confirmPasswordLabel')}
                name='confirm-password'
                type='password'
                placeholder={translate('form.confirmPasswordPlaceholder')}
              />
              <div className='grid md:grid-cols-2 gap-3'>
                <FormControl
                  labelText={translate('form.firstNameLabel')}
                  name='first-name'
                  placeholder={translate('form.firstNamePlaceholder')}
                  errorProps={{
                    className: 'non-transparent',
                  }}
                />
                <FormControl
                  labelText={translate('form.lastNameLabel')}
                  name='last-name'
                  placeholder={translate('form.lastNamePlaceholder')}
                />
              </div>
              <FormControl
                labelText={translate('form.emailLabel')}
                name='email'
                type='email'
                placeholder={translate('form.emailPlaceholder')}
              />
              <Button
                fullSize
                type='submit'
                className={cx(
                  'sign-up-btn',
                  'mt-[15px]',
                  'px-[10px]',
                  'py-[15px]'
                )}
                disabled={isDisabled || loading}
                onClick={handleSubmit(onSubmitCreateUserHandlder)}
              >
                {loading ? 'Loading' : translate('signUp.signUpBtn')}
              </Button>
            </>
          );
        }}
      </Form>
    </AuthLayout>
  );
}

export default SignUp;

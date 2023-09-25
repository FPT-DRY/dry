'use client';

import Button, { ButtonProps } from '@components/elements/Button';
import useOAuth2Provider, {
  ProviderData,
} from '@features/authentication/hooks/useOAuthProvider';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import styles from './OAuthSignIn.module.scss';

const cx = classNames.bind(styles);

type SupportedProvidersType = 'google' | 'github';

interface OAuthSignInProps extends Omit<ButtonProps, 'fullSize' | 'onClick'> {
  provider: SupportedProvidersType;
}

function OAuthSignIn({
  provider,
  className,
  ...buttonProps
}: OAuthSignInProps) {
  const router = useRouter();
  const providers = useOAuth2Provider();
  const translate = useTranslations('features.authentication');

  if (!providers) {
    return;
  } else {
    const providerInfo = Object.entries(providers as Object)
      .filter(([providerName, _]) => provider === providerName)
      ?.map(([_, info]) => info)[0] as ProviderData;

    if (!providerInfo) {
      throw new Error('No provider mapped!');
    }

    let icon = undefined;
    switch (provider) {
      case 'github':
        icon = <FaGithub size={25} />;
        break;
      case 'google':
        icon = <FcGoogle size={25} />;
        break;
      default:
        return;
    }

    const onOAuth2AuthorizeHandler = async () => {
      const response = await signIn(
        providerInfo.id,
        {
          callbackUrl: '/',
        },
        { prompt: 'login' }
      );
      if (response?.error) {
        router.push(`?${new URLSearchParams({ error: response.error })}`);
      }
    };

    return (
      <Button
        fullSize
        className={cx('root', provider, className)}
        onClick={onOAuth2AuthorizeHandler}
        {...buttonProps}
      >
        {icon}
        <span className={cx('text')}>
          {translate('oauth', { provider: providerInfo.name })}
        </span>
      </Button>
    );
  }
}

export default OAuthSignIn;

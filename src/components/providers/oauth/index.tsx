'use client';

import Button, { ButtonProps } from '@components/elements/Button';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import useOAuth2Provider, { ProviderData } from '@hooks/useOAuthProvider';

import styles from './OAuthProvider.module.scss';

const cx = classNames.bind(styles);

type SupportedProvidersType = 'google' | 'github';

interface OAuthProviderProps extends Omit<ButtonProps, 'fullSize' | 'onClick'> {
  provider: SupportedProvidersType;
}

function OAuthProvider({
  provider,
  className,
  ...buttonProps
}: OAuthProviderProps) {
  const providers = useOAuth2Provider();

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

    const text = `Sign in with ${providerInfo.name}`;

    const onOAuth2AuthorizeHandler = () => {
      signIn(providerInfo.id, { callbackUrl: '/' }, { prompt: "login" });
    }

    return (
      <Button
        fullSize
        className={cx('root', provider, className)}
        onClick={onOAuth2AuthorizeHandler}
        {...buttonProps}
      >
        {icon}
        <span className={cx('text')}>{text}</span>
      </Button>
    );
  }
}

export default OAuthProvider;

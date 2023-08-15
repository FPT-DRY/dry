'use client';

import {
  AbstractIntlMessages,
  NextIntlClientProvider as IntlProvider,
} from 'next-intl';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '~/redux/store';

type Props = {
  nextIntlParams: {
    locale: string;
    messages: AbstractIntlMessages;
  };
  children: React.ReactNode;
};

export default function Providers({ nextIntlParams, children }: Props) {
  return (
    <ReduxProvider store={store}>
      <IntlProvider
        locale={nextIntlParams.locale}
        messages={nextIntlParams.messages}
      >
        {children}
      </IntlProvider>
    </ReduxProvider>
  );
}

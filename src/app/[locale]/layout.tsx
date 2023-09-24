import Providers from '@components/providers';
import { Session } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react';

import NavBar from '@components/navbar';
import '@stylesheets/global.scss';

type LayoutProps = {
  params: {
    locale: string;
    session: Session;
  };
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  let messages;

  try {
    messages = (await import(`~/dictionary/${params.locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <body>
      <Providers nextIntlParams={{ locale: params.locale, messages }}>
        <>
          <NavBar />
          <main>{children}</main>
        </>
      </Providers>
    </body>
  );
}

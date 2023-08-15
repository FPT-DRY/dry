import { notFound } from 'next/navigation';

import Providers from '@components/providers';

import '@stylesheets/global.scss';

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
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
        {children}
      </Providers>
    </body>
  );
}

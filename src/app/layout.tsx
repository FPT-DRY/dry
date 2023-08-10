import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'DRY Project',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      {children}
    </html>
  );
}

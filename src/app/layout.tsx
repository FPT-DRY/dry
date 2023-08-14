import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
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
    <ClerkProvider>
      <html lang='en'>{children}</html>
    </ClerkProvider>
  );
}

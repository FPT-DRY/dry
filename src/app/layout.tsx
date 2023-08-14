import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

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

async function Header() {
  const user = await currentUser();
  if (!user)
    return (
      <>
        <div className='navbar'>
          <div className='frame'>
            <Link href='/sign-in' className='custom-btn btn-1'>
              Sign In
            </Link>
          </div>
          <div className='frame'>
            <Link href='/sign-up' className='custom-btn btn-1'>
              Sign Up
            </Link>
          </div>
        </div>
      </>
    );
}

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <Header />
        {children}
      </html>
    </ClerkProvider>
  );
}

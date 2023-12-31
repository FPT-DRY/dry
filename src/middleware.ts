
import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants/locales';

const nextIntlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
});

export default nextIntlMiddleware;

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

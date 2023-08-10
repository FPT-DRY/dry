export const SUPPORTED_LOCALES = ['en', 'vi'] as const;
export const DEFAULT_LOCALE = 'en';

export type LocaleType = (typeof SUPPORTED_LOCALES)[number];

export function parseLocaleName(value: string): LocaleType {
  const locale = SUPPORTED_LOCALES.find((validLocale) => validLocale === value);
  if (locale) {
    return locale;
  } else {
    console.warn(
      "The string can not parse to be a valid locale name, automatically fallback to default locale: 'en'"
    );
    return DEFAULT_LOCALE;
  }
}

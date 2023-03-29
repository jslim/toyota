import { Lang, LangLocaleMap, Locale } from '@/data/types';

export const defaultLocale: Locale = Locale.EN;

export const defaultLang: Lang = Lang.EN;

export const langLocaleMap: LangLocaleMap = {
  [Lang.EN]: Locale.EN,
  [Lang.JP]: Locale.JP
};

export function getLocaleByLang(lang: Lang | null): Locale {
  const locale = Object.keys(langLocaleMap).find((key) => key === lang) as Lang;
  return langLocaleMap[locale || defaultLocale] as Locale;
}

export function getAllLangSlugs() {
  return Object.values(Lang).map((lang) => {
    return { params: { lang } };
  });
}

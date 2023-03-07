import { defaultLang, defaultLocale, langLocaleMap, langs } from '@/data/constants';
import { Lang, Locale } from '@/data/types';

export function getLang(lang: Lang | null) {
  return lang && langs.includes(lang) ? lang : defaultLang;
}

export function getLocaleByLang(lang: Lang | null): Locale {
  const currLang = getLang(lang);
  const locale = Object.keys(langLocaleMap).find((key) => key === currLang) as Lang;
  return langLocaleMap[locale || defaultLocale] as Locale;
}

export function getAllLangSlugs() {
  return langs.map((lang) => {
    return { params: { lang } };
  });
}

import { defaultLang } from '@/utils/locales';

export default function (location: Location) {
  if (!location) {
    throw Error(`Argument "location" is required`);
  }

  if (typeof window === 'undefined') {
    return {
      langSegment: defaultLang,
      urlParams: new URLSearchParams('')
    };
  }

  return {
    langSegment: location?.pathname?.split('/')[1] ?? defaultLang,
    urlParams: new URLSearchParams(location?.search ?? '')
  };
}

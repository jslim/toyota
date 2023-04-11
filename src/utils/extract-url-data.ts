import { NextRouter } from 'next/router';

import { PreviewURLParamsType } from '@/data/types';

import { defaultLang } from '@/utils/locales';

export default function (router: NextRouter) {
  if (typeof window === 'undefined') {
    return {
      langSegment: defaultLang,
      urlParams: {} as PreviewURLParamsType,
      isPreviewRoute: false
    };
  }

  return {
    langSegment: router.query.lang ?? defaultLang,
    urlParams: (router.query ?? {}) as PreviewURLParamsType,
    isPreviewRoute: router.pathname.endsWith('preview')
  };
}

import { useCallback, useEffect, useMemo, useState } from 'react';

import { APIContentful } from '@/data/API';
import { defaultLang } from '@/data/constants';
import { Lang } from '@/data/types';

import { getLocaleByLang } from '@/utils/locales';

type Args = {
  staticData: object;
};

export default function usePreviewData({ staticData }: Args) {
  const location = useMemo(() => {
    return typeof window !== 'undefined' ? window.location : ({} as Location);
  }, []);

  const { langSegment, urlParams } = useMemo(() => {
    return {
      langSegment: location?.pathname?.split('/')[1] ?? defaultLang,
      urlParams: new URLSearchParams(location?.search ?? null)
    };
  }, [location]);

  const {
    isPreview,
    spaceId,
    envId,
    entryId,
    previewToken: accessToken
  } = useMemo(() => {
    return {
      isPreview: urlParams.get('preview') === 'true',
      spaceId: urlParams.get('spaceId') ?? '',
      envId: urlParams.get('envId') ?? '',
      entryId: urlParams.get('entryId') ?? '',
      previewToken: urlParams.get('previewToken') ?? ''
    };
  }, [urlParams]);

  const [data, setData] = useState(staticData);

  const fetchData = useCallback(
    async function () {
      const apiContentful = new APIContentful({
        isPreview,
        spaceId,
        envId,
        accessToken
      });
      const response = await apiContentful.getEntryById(entryId, {
        locale: getLocaleByLang(langSegment as Lang)
      });
      response && setData(response);
    },
    [isPreview, spaceId, envId, accessToken, entryId, langSegment]
  );

  useEffect(() => {
    if (!isPreview) return;

    if (entryId) {
      fetchData();
    } else {
      console.error(`Required "entryId" is missing`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryId, isPreview]);

  return data;
}

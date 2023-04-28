import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { APIContentful } from '@/data/API';
import { FilteredEntity, Lang } from '@/data/types';

import extractUrlData from '@/utils/extract-url-data';
import { getLocaleByLang } from '@/utils/locales';

type Args = {
  staticData: FilteredEntity;
};

export default function usePreviewData({ staticData }: Args) {
  const router = useRouter();

  const {
    isPreviewRoute: isPreview,
    langSegment,
    spaceId,
    envId,
    entryId,
    previewToken: accessToken
  } = useMemo(() => {
    const { langSegment, urlParams, isPreviewRoute } = extractUrlData(router);
    return { isPreviewRoute, langSegment, ...urlParams };
  }, [router]);

  const [data, setData] = useState<FilteredEntity | null>(null);

  const validPreviewParams = useMemo(() => {
    return Boolean(spaceId && envId && entryId && accessToken);
  }, [accessToken, entryId, envId, spaceId]);

  const fetchData = useCallback(
    async function () {
      const apiContentful = new APIContentful({
        isPreview,
        spaceId,
        envId,
        accessToken
      });
      const response = await apiContentful.getEntryById(entryId, {
        locale: getLocaleByLang(langSegment as Lang),
        include: 10
      });
      response && setData(response);
    },
    [isPreview, spaceId, envId, accessToken, entryId, langSegment]
  );

  useEffect(() => {
    if (!validPreviewParams) return;

    if (entryId) {
      fetchData();
    } else {
      console.error(`Required "entryId" is missing`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryId, validPreviewParams]);

  return data || staticData;
}
